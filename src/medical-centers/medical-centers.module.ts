import { Module } from '@nestjs/common';
import { MedicalCentersService } from './medical-centers.service';
import { MedicalCentersController } from './medical-centers.controller';
import { RelationalMedicalCenterPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { permissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [RelationalMedicalCenterPersistenceModule, permissionsModule],
  controllers: [MedicalCentersController],
  providers: [MedicalCentersService],
  exports: [MedicalCentersService, RelationalMedicalCenterPersistenceModule],
})
export class MedicalCentersModule {}
