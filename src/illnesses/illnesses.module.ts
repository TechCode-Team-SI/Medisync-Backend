import { forwardRef, Module } from '@nestjs/common';
import { permissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';
import { IllnessesController } from './illnesses.controller';
import { IllnessesService } from './illnesses.service';
import { RelationalIllnessPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { BullModule } from '@nestjs/bullmq';
import { QueueName } from 'src/utils/queue-enum';
@Module({
  imports: [
    RelationalIllnessPersistenceModule,
    permissionsModule,
    forwardRef(() => UsersModule),
    BullModule.registerQueue({ name: QueueName.NOTIFICATION }),
  ],
  controllers: [IllnessesController],
  providers: [IllnessesService],
  exports: [IllnessesService, RelationalIllnessPersistenceModule],
})
export class IllnessesModule {}
