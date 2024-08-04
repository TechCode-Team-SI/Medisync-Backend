import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import ms from 'ms';
import { AllConfigType } from '../config/config.type';
import { MailService } from '../mail/mail.service';
import { Session } from '../session/domain/session';
import { SessionService } from '../session/session.service';
import { User } from '../users/domain/user';
import { UsersService } from '../users/users.service';
import { NullableType } from '../utils/types/nullable.type';
import { exceptionResponses } from './auth.messages';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { SuccessResponseDto } from './dto/success-response.dto';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { JwtRefreshPayloadType } from './strategies/types/jwt-refresh-payload.type';
import { PasswordTokenRepository } from './infrastructure/persistence/password-token.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private sessionService: SessionService,
    private mailService: MailService,
    private configService: ConfigService<AllConfigType>,
    private passwordTokenRepository: PasswordTokenRepository,
  ) {}

  async validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnprocessableEntityException(exceptionResponses.UserNotFound);
    }

    if (!user.password) {
      throw new UnprocessableEntityException(
        exceptionResponses.IncorrectPassword,
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnprocessableEntityException(
        exceptionResponses.IncorrectPassword,
      );
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const session = await this.sessionService.create({
      user,
      hash,
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      email: user.email,
      roles: user.roles,
      sessionId: session.id,
      hash,
    });

    return {
      refreshToken,
      token,
      tokenExpires,
      user,
    };
  }

  async register(dto: AuthRegisterLoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.create({
      ...dto,
      email: dto.email,
    });

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const session = await this.sessionService.create({
      user,
      hash,
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      email: user.email,
      roles: user.roles,
      sessionId: session.id,
      hash,
    });

    return {
      refreshToken,
      token,
      tokenExpires,
      user,
    };
  }

  //TODO: Update this to use code instead of hash
  async confirmEmail(email: string, code: string): Promise<SuccessResponseDto> {
    let userId: User['id'];
    console.log(code);

    try {
      const jwtData = await this.jwtService.verifyAsync<{
        confirmEmailUserId: User['id'];
      }>(code, {
        secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
          infer: true,
        }),
      });

      userId = jwtData.confirmEmailUserId;
    } catch {
      throw new UnprocessableEntityException(exceptionResponses.InvalidHash);
    }

    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException(exceptionResponses.UserNotFound);
    }

    await this.usersService.update(user.id, user);

    return {
      success: true,
    };
  }

  async forgotPassword(email: string): Promise<SuccessResponseDto> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnprocessableEntityException(exceptionResponses.EmailNotExist);
    }

    const tokenExpiresIn = this.configService.getOrThrow('auth.forgotExpires', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const passwordToken = await this.passwordTokenRepository.create(
      email,
      new Date(tokenExpires),
    );

    void this.mailService.forgotPassword({
      to: email,
      data: {
        code: passwordToken.code,
      },
    });

    return {
      success: true,
    };
  }

  async resetPassword(
    email: string,
    code: string,
    password: string,
  ): Promise<SuccessResponseDto> {
    const passwordToken = await this.passwordTokenRepository.findOne({
      email,
      code,
    });

    if (!passwordToken) {
      throw new UnprocessableEntityException(
        exceptionResponses.InvalidPasswordReset,
      );
    }

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnprocessableEntityException(exceptionResponses.UserNotFound);
    }

    user.password = password;

    await this.sessionService.deleteByUserId({
      userId: user.id,
    });

    await this.passwordTokenRepository.deleteById(passwordToken.id);

    await this.usersService.update(user.id, user);

    return {
      success: true,
    };
  }

  async me(userJwtPayload: JwtPayloadType): Promise<NullableType<User>> {
    return this.usersService.findById(userJwtPayload.id);
  }

  async update(
    userJwtPayload: JwtPayloadType,
    userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    const currentUser = await this.usersService.findById(userJwtPayload.id);

    if (!currentUser) {
      throw new UnprocessableEntityException(exceptionResponses.UserNotFound);
    }

    if (userDto.password) {
      await this.sessionService.deleteByUserIdWithExclude({
        userId: currentUser.id,
        excludeSessionId: userJwtPayload.sessionId,
      });
    }

    await this.usersService.update(userJwtPayload.id, userDto);

    return this.usersService.findById(userJwtPayload.id);
  }

  async refreshToken(
    data: Pick<JwtRefreshPayloadType, 'sessionId' | 'hash'>,
  ): Promise<Omit<LoginResponseDto, 'user'>> {
    const session = await this.sessionService.findById(data.sessionId);

    if (!session) {
      throw new UnauthorizedException();
    }

    if (session.hash !== data.hash) {
      throw new UnauthorizedException();
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const user = await this.usersService.findById(session.user.id);

    if (!user?.roles || user.roles.length === 0) {
      throw new UnauthorizedException();
    }

    await this.sessionService.update(session.id, {
      hash,
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: session.user.id,
      email: user.email,
      roles: user.roles,
      sessionId: session.id,
      hash,
    });

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }

  async softDelete(userId: string): Promise<void> {
    await this.usersService.remove(userId);
  }

  async logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>) {
    return this.sessionService.deleteById(data.sessionId);
  }

  private async getTokensData(data: {
    id: User['id'];
    email: User['email'];
    roles: User['roles'];
    sessionId: Session['id'];
    hash: Session['hash'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const payload: Omit<JwtPayloadType, 'iat' | 'exp'> = {
      id: data.id,
      roles: data.roles,
      email: data.email,
      sessionId: data.sessionId,
    };

    const refreshPayload: Omit<JwtRefreshPayloadType, 'iat' | 'exp'> = {
      sessionId: data.sessionId,
      hash: data.hash,
    };

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('auth.secret', { infer: true }),
        expiresIn: tokenExpiresIn,
      }),
      await this.jwtService.signAsync(refreshPayload, {
        secret: this.configService.getOrThrow('auth.refreshSecret', {
          infer: true,
        }),
        expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
          infer: true,
        }),
      }),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}
