import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InjuryEntity } from 'src/injuries/infrastructure/persistence/relational/entities/injury.entity';
import { InjurySeedService } from './injury-seed.service';
@Module({
  imports: [TypeOrmModule.forFeature([InjuryEntity])],
  providers: [InjurySeedService],
  exports: [InjurySeedService],
})
export class InjurySeedModule {}
