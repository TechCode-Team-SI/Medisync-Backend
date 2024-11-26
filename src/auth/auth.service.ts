import { InjectQueue } from '@nestjs/bullmq';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { Queue } from 'bullmq';
import crypto from 'crypto';
import ms from 'ms';
import { RolesEnum } from 'src/roles/roles.enum';
import { RolesService } from 'src/roles/roles.service';
import { MailQueueOperations, QueueName } from 'src/utils/queue-enum';
import { AllConfigType } from '../config/config.type';
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
import { ConfirmEmailTokenRepository } from './infrastructure/persistence/confirm-email-token.repository';
import { PasswordTokenRepository } from './infrastructure/persistence/password-token.repository';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { JwtRefreshPayloadType } from './strategies/types/jwt-refresh-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private sessionService: SessionService,
    @InjectQueue(QueueName.MAIL) private mailQueue: Queue,
    private configService: ConfigService<AllConfigType>,
    private passwordTokenRepository: PasswordTokenRepository,
    private confirmEmailTokenRepository: ConfirmEmailTokenRepository,
    private rolesService: RolesService,
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
      employeeId: user.employeeProfile?.id,
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
    const { userPatient, ...data } = dto;

    const user = await this.usersService.create({
      ...data,
      email: data.email,
    });

    if (userPatient) {
      const patientProfile = await this.usersService.createUserPatient(
        user.id,
        userPatient,
      );
      if (!patientProfile) {
        throw new UnprocessableEntityException(
          exceptionResponses.UserPatientNotCreated,
        );
      }
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

  async confirmEmail(email: string, code: string): Promise<SuccessResponseDto> {
    const confirmEmailToken = await this.confirmEmailTokenRepository.findOne({
      email,
      code,
    });

    if (!confirmEmailToken) {
      throw new UnprocessableEntityException(
        exceptionResponses.InvalidConfirmEmail,
      );
    }

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnprocessableEntityException(exceptionResponses.UserNotFound);
    }

    await this.confirmEmailTokenRepository.deleteById(confirmEmailToken.id);

    const role = await this.rolesService.findbySlug(RolesEnum.MOBILE_USER);

    if (!role) {
      throw new UnprocessableEntityException(exceptionResponses.RoleNotExists);
    }

    await this.usersService.update(user.id, {
      roles: [{ id: role.id }],
    });

    return {
      success: true,
    };
  }

  async generateCodeConfirmEmail(email: string): Promise<SuccessResponseDto> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnprocessableEntityException(exceptionResponses.EmailNotExist);
    }

    const tokenExpiresIn = this.configService.getOrThrow(
      'auth.confirmEmailExpires',
      {
        infer: true,
      },
    );

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const passwordToken = await this.confirmEmailTokenRepository.create(
      email,
      new Date(tokenExpires),
    );

    await this.mailQueue.add(MailQueueOperations.CONFIRM_EMAIL, {
      to: email,
      data: {
        code: passwordToken.code,
        fullName: user.fullName,
      },
    });

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

    await this.mailQueue.add(MailQueueOperations.FORGOT_PASSWORD, {
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

  async checkPasswordCode(email: string, code: string): Promise<boolean> {
    const passwordToken = await this.passwordTokenRepository.findOne({
      email,
      code,
    });

    if (!passwordToken) {
      return false;
    }

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return false;
    }

    return true;
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
      employeeId: user.employeeProfile?.id,
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
    employeeId?: string;
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
      employeeId: data.employeeId,
      email: data.email,
      roleSlugs: data.roles?.map((role) => role.slug) || [],
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
