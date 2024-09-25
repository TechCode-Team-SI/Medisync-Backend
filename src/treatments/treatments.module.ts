import { Module } from '@nestjs/common';
import { treatmentsService } from './treatments.service';
import { treatmentsController } from './treatments.controller';
import { RelationaltreatmentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationaltreatmentPersistenceModule],
  controllers: [treatmentsController],
  providers: [treatmentsService],
  exports: [treatmentsService, RelationaltreatmentPersistenceModule],
})
export class treatmentsModule {}
