import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RelationalRolePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { permissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
@Module({
  imports: [
    RelationalRolePersistenceModule,
    permissionsModule,
    forwardRef(() => UsersModule),
    NotificationsModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService, RelationalRolePersistenceModule],
})
export class RolesModule {}
