import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Module } from '@nestjs/common';
import { DiagnosticsModule } from 'src/diagnostics/diagnostics.module';
import { InstructionsModule } from 'src/instructions/instructions.module';
import { permissionsModule } from 'src/permissions/permissions.module';
import { RatingsModule } from 'src/ratings/ratings.module';
import { RequestTemplatesModule } from 'src/request-templates/request-templates.module';
import { SpecialtiesModule } from 'src/specialties/specialties.module';
import { UsersModule } from 'src/users/users.module';
import { QueueName } from 'src/utils/queue-enum';
import { RelationalRequestPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

@Module({
  imports: [
    RelationalRequestPersistenceModule,
    RequestTemplatesModule,
    UsersModule,
    DiagnosticsModule,
    InstructionsModule,
    forwardRef(() => RatingsModule),
    forwardRef(() => SpecialtiesModule),
    permissionsModule,
    BullModule.registerQueue({ name: QueueName.NOTIFICATION }),
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService, RelationalRequestPersistenceModule],
})
export class RequestsModule {}
