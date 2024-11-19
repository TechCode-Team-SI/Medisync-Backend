import { forwardRef, Module } from '@nestjs/common';
import { AgendasService } from './agendas.service';
import { AgendasController } from './agendas.controller';
import { RelationalAgendaPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { EmployeeProfilesModule } from 'src/employee-profiles/employee-profiles.module';
import { SpecialtiesModule } from 'src/specialties/specialties.module';
import { permissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    RelationalAgendaPersistenceModule,
    EmployeeProfilesModule,
    forwardRef(() => SpecialtiesModule),
    permissionsModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [AgendasController],
  providers: [AgendasService],
  exports: [AgendasService, RelationalAgendaPersistenceModule],
})
export class AgendasModule {}
