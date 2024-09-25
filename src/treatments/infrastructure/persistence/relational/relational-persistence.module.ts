import { Module } from '@nestjs/common';
import { TreatmentRepository } from '../treatment.repository';
import { TreatmentRelationalRepository } from './repositories/treatment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentEntity } from './entities/treatment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TreatmentEntity])],
  providers: [
    {
      provide: TreatmentRepository,
      useClass: TreatmentRelationalRepository,
    },
  ],
  exports: [TreatmentRepository],
})
export class RelationaltreatmentPersistenceModule {}
