import { Module } from '@nestjs/common';
import { EmployeeProfilesService } from './employee-profiles.service';
import { RelationalEmployeeProfilePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalEmployeeProfilePersistenceModule],
  providers: [EmployeeProfilesService],
  exports: [
    EmployeeProfilesService,
    RelationalEmployeeProfilePersistenceModule,
  ],
})
export class EmployeeProfilesModule {}
