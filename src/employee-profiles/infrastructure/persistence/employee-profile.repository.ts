import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { EmployeeProfile } from '../../domain/employee-profile';
import { findOptions } from 'src/utils/types/fine-options.type';

export abstract class EmployeeProfileRepository {
  abstract create(
    data: Omit<EmployeeProfile, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<EmployeeProfile>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<EmployeeProfile>>;

  abstract findById(
    id: EmployeeProfile['id'],
    options?: findOptions,
  ): Promise<NullableType<EmployeeProfile>>;

  abstract update(
    id: EmployeeProfile['id'],
    payload: DeepPartial<EmployeeProfile>,
  ): Promise<EmployeeProfile | null>;

  abstract remove(id: EmployeeProfile['id']): Promise<void>;
}
