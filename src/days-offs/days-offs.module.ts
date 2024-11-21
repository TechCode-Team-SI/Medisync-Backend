import { Module } from '@nestjs/common';
import { AgendasModule } from 'src/agendas/agendas.module';
import { EmployeeProfilesModule } from 'src/employee-profiles/employee-profiles.module';
import { DaysOffsController } from './days-offs.controller';
import { DaysOffsService } from './days-offs.service';
import { RelationalDaysOffPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { SpecialtiesModule } from 'src/specialties/specialties.module';
import { permissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    RelationalDaysOffPersistenceModule,
    AgendasModule,
    EmployeeProfilesModule,
    SpecialtiesModule,
    permissionsModule,
    UsersModule,
  ],
  controllers: [DaysOffsController],
  providers: [DaysOffsService],
  exports: [DaysOffsService, RelationalDaysOffPersistenceModule],
})
export class DaysOffsModule {}
