import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Module } from '@nestjs/common';
import { permissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';
import { QueueName } from 'src/utils/queue-enum';
import { RelationaltreatmentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { treatmentsController } from './treatments.controller';
import { TreatmentsService } from './treatments.service';

@Module({
  imports: [
    RelationaltreatmentPersistenceModule,
    permissionsModule,
    forwardRef(() => UsersModule),
    BullModule.registerQueue({ name: QueueName.NOTIFICATION }),
  ],
  controllers: [treatmentsController],
  providers: [TreatmentsService],
  exports: [TreatmentsService, RelationaltreatmentPersistenceModule],
})
export class treatmentsModule {}
