import { Injectable } from '@nestjs/common';
import { EmployeeProfileRepository } from './infrastructure/persistence/employee-profile.repository';
import { EmployeeProfile } from './domain/employee-profile';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class EmployeeProfilesService {
  constructor(
    private readonly employeeProfileRepository: EmployeeProfileRepository,
  ) {}

  findOne(id: EmployeeProfile['id'], options?: findOptions) {
    return this.employeeProfileRepository.findById(id, options);
  }
}
