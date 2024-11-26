import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { MailModule } from '../mail/mail.module';
import { SessionModule } from '../session/session.module';
import { UsersModule } from '../users/users.module';
import { RelationalPasswordTokenPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordTokenEntity } from './infrastructure/persistence/relational/entities/password-token.entity';
import { RolesModule } from 'src/roles/roles.module';
import { BullModule } from '@nestjs/bullmq';
import { QueueName } from 'src/utils/queue-enum';

@Module({
  imports: [
    UsersModule,
    SessionModule,
    PassportModule,
    MailModule,
    RolesModule,
    RelationalPasswordTokenPersistenceModule,
    TypeOrmModule.forFeature([PasswordTokenEntity]),
    JwtModule.register({}),
    BullModule.registerQueue({ name: QueueName.MAIL }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, AnonymousStrategy],
  exports: [AuthService],
})
export class AuthModule {}
