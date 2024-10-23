import { Module } from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { treatmentsController } from './treatments.controller';
import { RelationaltreatmentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { permissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [RelationaltreatmentPersistenceModule, permissionsModule],
  controllers: [treatmentsController],
  providers: [TreatmentsService],
  exports: [TreatmentsService, RelationaltreatmentPersistenceModule],
})
export class treatmentsModule {}
