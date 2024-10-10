import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { User } from '../../domain/user';

import { RoleDto } from 'src/roles/dto/role.dto';
import { FilterUserDto, SortUserDto } from '../../dto/query-user.dto';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';

export abstract class UserRepository extends BaseRepository {
  abstract create(
    data: Omit<User, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt' | 'roles'>,
    roles: RoleDto[],
  ): Promise<User>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    options,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
    options?: findOptions & { employeeProfile: boolean };
  }): Promise<PaginationResponseDto<User>>;

  abstract findAll({
    filterOptions,
    sortOptions,
    options,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    options?: findOptions & { employeeProfile: boolean };
  }): Promise<User[]>;

  abstract findById(
    id: User['id'],
    options?: findOptions & {
      withProfile?: boolean;
      withSpecialty?: boolean;
      withUserPatients?: boolean;
    },
  ): Promise<NullableType<User>>;
  abstract findByEmail(email: User['email']): Promise<NullableType<User>>;

  abstract count(): Promise<number>;

  abstract update(
    id: User['id'],
    payload: DeepPartial<User>,
  ): Promise<User | null>;

  abstract remove(id: User['id']): Promise<void>;
}
