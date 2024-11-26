import { forwardRef, Module } from '@nestjs/common';
import { PathologiesService } from './pathologies.service';
import { PathologiesController } from './pathologies.controller';
import { RelationalPathologyPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { permissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
@Module({
  imports: [
    RelationalPathologyPersistenceModule,
    permissionsModule,
    forwardRef(() => UsersModule),
    NotificationsModule,
  ],
  controllers: [PathologiesController],
  providers: [PathologiesService],
  exports: [PathologiesService, RelationalPathologyPersistenceModule],
})
export class PathologiesModule {}
