import { Injectable } from '@nestjs/common';
import { CreateUserPatientDto } from './dto/create-user-patient.dto';
import { UpdateUserPatientDto } from './dto/update-user-patient.dto';
import { UserPatientRepository } from './infrastructure/persistence/user-patient.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UserPatient } from './domain/user-patient';
import { findOptions } from 'src/utils/types/fine-options.type';
import { SortUserPatientsDto } from 'src/user-patients/dto/find-all-user-patients.dto';

@Injectable()
export class UserPatientsService {
  constructor(private readonly userPatientRepository: UserPatientRepository) {}

  create(createUserPatientDto: CreateUserPatientDto) {
    return this.userPatientRepository.create(createUserPatientDto);
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortUserPatientsDto[] | null;
  }) {
    return this.userPatientRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
    });
  }

  findOne(id: UserPatient['id'], options?: findOptions) {
    return this.userPatientRepository.findById(id, options);
  }

  update(id: UserPatient['id'], updateUserPatientDto: UpdateUserPatientDto) {
    return this.userPatientRepository.update(id, updateUserPatientDto);
  }

  remove(id: UserPatient['id']) {
    return this.userPatientRepository.remove(id);
  }
}
