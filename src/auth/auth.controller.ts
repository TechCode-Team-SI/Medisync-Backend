import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/domain/user';
import { NullableType } from '../utils/types/nullable.type';
import { Me } from './auth.decorator';
import { AuthService } from './auth.service';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';
import { IsValidPassCodeDto } from './dto/auth-is-valid-code.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { SuccessResponseDto } from './dto/success-response.dto';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { TransactionInterceptor } from 'src/common/transaction.interceptor';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('login')
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  public login(@Body() loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    return this.service.validateLogin(loginDto);
  }

  @Post('register')
  @UseInterceptors(TransactionInterceptor)
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() createUserDto: AuthRegisterLoginDto,
  ): Promise<LoginResponseDto> {
    return this.service.register(createUserDto);
  }

  @Post('confirm/email')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async generateConfirmEmail(
    @Me() userPayload: JwtPayloadType,
  ): Promise<SuccessResponseDto> {
    return this.service.generateCodeConfirmEmail(userPayload.email);
  }

  @Post('confirm')
  @UseInterceptors(TransactionInterceptor)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async confirmEmail(
    @Me() userPayload: JwtPayloadType,
    @Body() confirmEmailDto: AuthConfirmEmailDto,
  ): Promise<SuccessResponseDto> {
    return this.service.confirmEmail(userPayload.email, confirmEmailDto.code);
  }

  @Post('forgot/password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(
    @Body() forgotPasswordDto: AuthForgotPasswordDto,
  ): Promise<SuccessResponseDto> {
    return this.service.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset/password')
  @HttpCode(HttpStatus.OK)
  resetPassword(
    @Body() resetPasswordDto: AuthResetPasswordDto,
  ): Promise<SuccessResponseDto> {
    return this.service.resetPassword(
      resetPasswordDto.email,
      resetPasswordDto.code,
      resetPasswordDto.password,
    );
  }

  @Post('forgot/password-code')
  @HttpCode(HttpStatus.OK)
  async checkPassCode(
    @Body() checkPassCodeDto: IsValidPassCodeDto,
  ): Promise<SuccessResponseDto> {
    const isValid = await this.service.checkPasswordCode(
      checkPassCodeDto.email,
      checkPassCodeDto.code,
    );
    return { success: isValid };
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  public me(@Me() userPayload: JwtPayloadType): Promise<NullableType<User>> {
    return this.service.me(userPayload);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: RefreshResponseDto,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  public refresh(@Request() request): Promise<RefreshResponseDto> {
    return this.service.refreshToken({
      sessionId: request.user.sessionId,
      hash: request.user.hash,
    });
  }

  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logout(@Me() userPayload: JwtPayloadType): Promise<void> {
    await this.service.logout({
      sessionId: userPayload.sessionId,
    });
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: User,
  })
  public update(
    @Me() userPayload: JwtPayloadType,
    @Body() userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    return this.service.update(userPayload, userDto);
  }

  @ApiBearerAuth()
  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Me() userPayload: JwtPayloadType): Promise<void> {
    return this.service.softDelete(userPayload.id);
  }
}
