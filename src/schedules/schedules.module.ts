import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { RelationalSchedulePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { permissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [RelationalSchedulePersistenceModule, permissionsModule],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService, RelationalSchedulePersistenceModule],
})
export class SchedulesModule {}
