import { forwardRef, Module } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesController } from './specialties.controller';
import { RelationalSpecialtyPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from 'src/files/files.module';
import { UsersModule } from 'src/users/users.module';
import { RequestTemplatesModule } from 'src/request-templates/request-templates.module';
import { permissionsModule } from 'src/permissions/permissions.module';
import { RequestsModule } from 'src/requests/requests.module';
import { AgendasModule } from 'src/agendas/agendas.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
@Module({
  imports: [
    RelationalSpecialtyPersistenceModule,
    FilesModule,
    forwardRef(() => UsersModule),
    RequestTemplatesModule,
    permissionsModule,
    forwardRef(() => RequestsModule),
    forwardRef(() => AgendasModule),
    NotificationsModule,
  ],
  controllers: [SpecialtiesController],
  providers: [SpecialtiesService],
  exports: [SpecialtiesService, RelationalSpecialtyPersistenceModule],
})
export class SpecialtiesModule {}
