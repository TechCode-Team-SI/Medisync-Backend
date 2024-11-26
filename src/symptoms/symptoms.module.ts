import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { permissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';
import { QueueName } from 'src/utils/queue-enum';
import { RelationalSymptomPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SymptomsController } from './symptoms.controller';
import { SymptomsService } from './symptoms.service';
@Module({
  imports: [
    RelationalSymptomPersistenceModule,
    UsersModule,
    permissionsModule,
    BullModule.registerQueue({ name: QueueName.NOTIFICATION }),
  ],
  controllers: [SymptomsController],
  providers: [SymptomsService],
  exports: [SymptomsService, RelationalSymptomPersistenceModule],
})
export class SymptomsModule {}
