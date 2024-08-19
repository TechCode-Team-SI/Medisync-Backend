import { Module } from '@nestjs/common';
import { MedicalCenterRepository } from '../medical-center.repository';
import { MedicalCenterRelationalRepository } from './repositories/medical-center.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalCenterEntity } from './entities/medical-center.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalCenterEntity])],
  providers: [
    {
      provide: MedicalCenterRepository,
      useClass: MedicalCenterRelationalRepository,
    },
  ],
  exports: [MedicalCenterRepository],
})
export class RelationalMedicalCenterPersistenceModule {}
