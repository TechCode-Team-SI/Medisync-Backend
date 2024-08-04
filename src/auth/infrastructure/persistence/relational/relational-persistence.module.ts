import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordTokenRepository } from '../password-token.repository';
import { PasswordTokenEntity } from './entities/password-token.entity';
import { PasswordTokenRelationalRepository } from './repositories/password-token.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordTokenEntity])],
  providers: [
    {
      provide: PasswordTokenRepository,
      useClass: PasswordTokenRelationalRepository,
    },
  ],
  exports: [PasswordTokenRepository],
})
export class RelationalPasswordTokenPersistenceModule {}
