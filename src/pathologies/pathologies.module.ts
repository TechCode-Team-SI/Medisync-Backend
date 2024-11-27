import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Module } from '@nestjs/common';
import { permissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';
import { QueueName } from 'src/utils/queue-enum';
import { RelationalPathologyPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { PathologiesController } from './pathologies.controller';
import { PathologiesService } from './pathologies.service';
@Module({
  imports: [
    RelationalPathologyPersistenceModule,
    permissionsModule,
    forwardRef(() => UsersModule),
    BullModule.registerQueue({ name: QueueName.NOTIFICATION }),
  ],
  controllers: [PathologiesController],
  providers: [PathologiesService],
  exports: [PathologiesService, RelationalPathologyPersistenceModule],
})
export class PathologiesModule {}
