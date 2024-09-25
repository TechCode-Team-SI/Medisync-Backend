import { Module } from '@nestjs/common';
import { SymptomRepository } from '../symptom.repository';
import { SymptomRelationalRepository } from './repositories/symptom.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SymptomEntity } from './entities/symptom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SymptomEntity])],
  providers: [
    {
      provide: SymptomRepository,
      useClass: SymptomRelationalRepository,
    },
  ],
  exports: [SymptomRepository],
})
export class RelationalSymptomPersistenceModule {}
