import { Module } from '@nestjs/common';
import { SpecialtiesModule } from 'src/specialties/specialties.module';
import { EmployeeProfilesModule } from 'src/employee-profiles/employee-profiles.module';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RelationalRoomPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    RelationalRoomPersistenceModule,
    SpecialtiesModule,
    EmployeeProfilesModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService, RelationalRoomPersistenceModule],
})
export class RoomsModule {}
