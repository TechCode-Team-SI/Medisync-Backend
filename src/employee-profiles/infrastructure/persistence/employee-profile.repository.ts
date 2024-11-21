import { BaseRepository } from 'src/common/base.repository';
import { NullableType } from '../../../utils/types/nullable.type';
import { EmployeeProfile } from '../../domain/employee-profile';
import { findOptions } from 'src/utils/types/fine-options.type';
import { DeepPartial } from 'typeorm';

export abstract class EmployeeProfileRepository extends BaseRepository {
  abstract findById(
    id: EmployeeProfile['id'],
    options?: findOptions,
  ): Promise<NullableType<EmployeeProfile>>;

  abstract update(
    id: EmployeeProfile['id'],
    payload: DeepPartial<EmployeeProfile>,
  ): Promise<EmployeeProfile | null>;
}
