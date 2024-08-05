import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordTokenRepository } from '../password-token.repository';
import { PasswordTokenEntity } from './entities/password-token.entity';
import { PasswordTokenRelationalRepository } from './repositories/password-token.repository';
import { ConfirmEmailTokenRepository } from '../confirm-email-token.repository';
import { ConfirmEmailTokenEntity } from './entities/confirm-email-token.entity';
import { ConfirmEmailTokenRelationalRepository } from './repositories/confirm-email-token.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordTokenEntity, ConfirmEmailTokenEntity]),
  ],
  providers: [
    {
      provide: PasswordTokenRepository,
      useClass: PasswordTokenRelationalRepository,
    },
    {
      provide: ConfirmEmailTokenRepository,
      useClass: ConfirmEmailTokenRelationalRepository,
    },
  ],
  exports: [PasswordTokenRepository, ConfirmEmailTokenRepository],
})
export class RelationalPasswordTokenPersistenceModule {}
