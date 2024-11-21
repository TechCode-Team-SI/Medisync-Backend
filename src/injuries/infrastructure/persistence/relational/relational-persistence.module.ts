import { Module } from '@nestjs/common';
import { InjuryRepository } from '../injury.repository';
import { InjuryRelationalRepository } from './repositories/injury.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InjuryEntity } from './entities/injury.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InjuryEntity])],
  providers: [
    {
      provide: InjuryRepository,
      useClass: InjuryRelationalRepository,
    },
  ],
  exports: [InjuryRepository],
})
export class RelationalInjuryPersistenceModule {}
