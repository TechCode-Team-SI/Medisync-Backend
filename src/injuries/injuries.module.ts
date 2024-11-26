import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Module } from '@nestjs/common';
import { permissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';
import { QueueName } from 'src/utils/queue-enum';
import { RelationalInjuryPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { InjuriesController } from './injuries.controller';
import { InjuriesService } from './injuries.service';
@Module({
  imports: [
    RelationalInjuryPersistenceModule,
    permissionsModule,
    forwardRef(() => UsersModule),
    BullModule.registerQueue({ name: QueueName.NOTIFICATION }),
  ],
  controllers: [InjuriesController],
  providers: [InjuriesService],
  exports: [InjuriesService, RelationalInjuryPersistenceModule],
})
export class InjuriesModule {}
