import { NullableType } from '../../../utils/types/nullable.type';
import { EmployeeProfile } from '../../domain/employee-profile';
import { findOptions } from 'src/utils/types/fine-options.type';

export abstract class EmployeeProfileRepository {
  abstract findById(
    id: EmployeeProfile['id'],
    options?: findOptions,
  ): Promise<NullableType<EmployeeProfile>>;
}
