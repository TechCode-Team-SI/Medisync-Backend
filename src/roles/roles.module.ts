import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Module } from '@nestjs/common';
import { permissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';
import { QueueName } from 'src/utils/queue-enum';
import { RelationalRolePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
@Module({
  imports: [
    RelationalRolePersistenceModule,
    permissionsModule,
    forwardRef(() => UsersModule),
    BullModule.registerQueue({ name: QueueName.NOTIFICATION }),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService, RelationalRolePersistenceModule],
})
export class RolesModule {}
