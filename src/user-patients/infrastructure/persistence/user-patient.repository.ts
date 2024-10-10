import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserPatient } from '../../domain/user-patient';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import {
  FilterUserPatientsDto,
  SortUserPatientsDto,
} from 'src/user-patients/dto/find-all-user-patients.dto';

export abstract class UserPatientRepository extends BaseRepository {
  abstract create(
    data: Omit<UserPatient, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserPatient>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortUserPatientsDto[] | null;
    filterOptions?: FilterUserPatientsDto | null;
  }): Promise<PaginationResponseDto<UserPatient>>;

  abstract findById(
    id: UserPatient['id'],
    options?: findOptions,
  ): Promise<NullableType<UserPatient>>;

  abstract update(
    id: UserPatient['id'],
    payload: DeepPartial<Omit<UserPatient, 'dni'>>,
  ): Promise<UserPatient | null>;

  abstract remove(id: UserPatient['id']): Promise<void>;
}
