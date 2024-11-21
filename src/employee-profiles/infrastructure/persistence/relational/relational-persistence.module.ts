import { Module } from '@nestjs/common';
import { EmployeeProfileRepository } from '../employee-profile.repository';
import { EmployeeProfileRelationalRepository } from './repositories/employee-profile.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeProfileEntity } from './entities/employee-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeProfileEntity])],
  providers: [
    {
      provide: EmployeeProfileRepository,
      useClass: EmployeeProfileRelationalRepository,
    },
  ],
  exports: [EmployeeProfileRepository],
})
export class RelationalEmployeeProfilePersistenceModule {}
