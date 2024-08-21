import { Module } from '@nestjs/common';
import { EmployeeProfilesService } from './employee-profiles.service';
import { EmployeeProfilesController } from './employee-profiles.controller';
import { RelationalEmployeeProfilePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalEmployeeProfilePersistenceModule],
  controllers: [EmployeeProfilesController],
  providers: [EmployeeProfilesService],
  exports: [
    EmployeeProfilesService,
    RelationalEmployeeProfilePersistenceModule,
  ],
})
export class EmployeeProfilesModule {}
