import { Module } from '@nestjs/common';
import { SpecialtiesModule } from 'src/specialties/specialties.module';
import { EmployeeProfilesModule } from 'src/employee-profiles/employee-profiles.module';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RelationalRoomPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { permissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    RelationalRoomPersistenceModule,
    SpecialtiesModule,
    EmployeeProfilesModule,
    permissionsModule,
    UsersModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService, RelationalRoomPersistenceModule],
})
export class RoomsModule {}
