import { Injectable } from '@nestjs/common';
//import { CreateEmployeeProfileDto } from './dto/create-employee-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee-profile.dto';
import { EmployeeProfileRepository } from './infrastructure/persistence/employee-profile.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { EmployeeProfile } from './domain/employee-profile';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class EmployeeProfilesService {
  constructor(
    private readonly employeeProfileRepository: EmployeeProfileRepository,
  ) {}

  /*
  create(createEmployeeProfileDto: CreateEmployeeProfileDto) {
    return this.employeeProfileRepository.create(createEmployeeProfileDto);
  }
  */

  create() {
    return null;
  }

  findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }) {
    return this.employeeProfileRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
    });
  }

  findOne(id: EmployeeProfile['id'], options?: findOptions) {
    return this.employeeProfileRepository.findById(id, options);
  }

  update(
    id: EmployeeProfile['id'],
    updateEmployeeProfileDto: UpdateEmployeeProfileDto,
  ) {
    return this.employeeProfileRepository.update(id, updateEmployeeProfileDto);
  }

  remove(id: EmployeeProfile['id']) {
    return this.employeeProfileRepository.remove(id);
  }
}
