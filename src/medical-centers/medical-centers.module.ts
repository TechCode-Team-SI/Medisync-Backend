import { Module } from '@nestjs/common';
import { MedicalCentersService } from './medical-centers.service';
import { MedicalCentersController } from './medical-centers.controller';
import { RelationalMedicalCenterPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalMedicalCenterPersistenceModule],
  controllers: [MedicalCentersController],
  providers: [MedicalCentersService],
  exports: [MedicalCentersService, RelationalMedicalCenterPersistenceModule],
})
export class MedicalCentersModule {}
