import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Module } from '@nestjs/common';
import { EmployeeProfilesModule } from 'src/employee-profiles/employee-profiles.module';
import { permissionsModule } from 'src/permissions/permissions.module';
import { SpecialtiesModule } from 'src/specialties/specialties.module';
import { UsersModule } from 'src/users/users.module';
import { QueueName } from 'src/utils/queue-enum';
import { AgendasController } from './agendas.controller';
import { AgendasService } from './agendas.service';
import { RelationalAgendaPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    RelationalAgendaPersistenceModule,
    EmployeeProfilesModule,
    forwardRef(() => SpecialtiesModule),
    permissionsModule,
    forwardRef(() => UsersModule),
    BullModule.registerQueue({ name: QueueName.NOTIFICATION }),
  ],
  controllers: [AgendasController],
  providers: [AgendasService],
  exports: [AgendasService, RelationalAgendaPersistenceModule],
})
export class AgendasModule {}
