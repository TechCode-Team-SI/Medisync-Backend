import { Module } from '@nestjs/common';
import { EmployeeProfilesService } from './employee-profiles.service';

@Module({
  providers: [EmployeeProfilesService],
  exports: [EmployeeProfilesService],
})
export class EmployeeProfilesModule {}
