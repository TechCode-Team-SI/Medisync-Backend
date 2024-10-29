import { forwardRef, Module } from '@nestjs/common';

import { UsersController } from './users.controller';

import { RolesModule } from 'src/roles/roles.module';
import { FilesModule } from '../files/files.module';
import { RelationalUserPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersService } from './users.service';
import { permissionsModule } from 'src/permissions/permissions.module';
import { EmployeeProfilesModule } from 'src/employee-profiles/employee-profiles.module';
import { UserPatientsModule } from 'src/user-patients/user-patients.module';
import { SpecialtiesModule } from 'src/specialties/specialties.module';
import { AgendasModule } from 'src/agendas/agendas.module';
import { SchedulesModule } from 'src/schedules/schedules.module';

const infrastructurePersistenceModule = RelationalUserPersistenceModule;

@Module({
  imports: [
    infrastructurePersistenceModule,
    FilesModule,
    RolesModule,
    permissionsModule,
    EmployeeProfilesModule,
    UserPatientsModule,
    forwardRef(() => SpecialtiesModule),
    SchedulesModule,
    AgendasModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
    UsersService,
    infrastructurePersistenceModule,
    RelationalUserPersistenceModule,
  ],
})
export class UsersModule {}
