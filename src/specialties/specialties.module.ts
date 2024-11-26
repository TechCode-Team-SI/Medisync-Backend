import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Module } from '@nestjs/common';
import { AgendasModule } from 'src/agendas/agendas.module';
import { FilesModule } from 'src/files/files.module';
import { permissionsModule } from 'src/permissions/permissions.module';
import { RequestTemplatesModule } from 'src/request-templates/request-templates.module';
import { RequestsModule } from 'src/requests/requests.module';
import { UsersModule } from 'src/users/users.module';
import { QueueName } from 'src/utils/queue-enum';
import { RelationalSpecialtyPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SpecialtiesController } from './specialties.controller';
import { SpecialtiesService } from './specialties.service';
@Module({
  imports: [
    RelationalSpecialtyPersistenceModule,
    FilesModule,
    forwardRef(() => UsersModule),
    RequestTemplatesModule,
    permissionsModule,
    forwardRef(() => RequestsModule),
    forwardRef(() => AgendasModule),
    BullModule.registerQueue({ name: QueueName.NOTIFICATION }),
  ],
  controllers: [SpecialtiesController],
  providers: [SpecialtiesService],
  exports: [SpecialtiesService, RelationalSpecialtyPersistenceModule],
})
export class SpecialtiesModule {}
