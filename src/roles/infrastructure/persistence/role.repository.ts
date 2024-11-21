import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Role } from '../../domain/role';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import { SortRoleDto } from 'src/roles/dto/find-all-roles.dto';

export abstract class RoleRepository extends BaseRepository {
  abstract create(
    data: DeepPartial<Omit<Role, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Role>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortRoleDto[] | null;
  }): Promise<PaginationResponseDto<Role>>;

  abstract findManyByIds(
    ids: Role['id'][],
    options?: findOptions,
  ): Promise<Role[]>;

  abstract findManyBySlugs(
    slugs: Role['slug'][],
    options?: findOptions,
  ): Promise<Role[]>;

  abstract findById(
    id: Role['id'],
    options?: findOptions,
  ): Promise<NullableType<Role>>;

  abstract findBySlug(
    name: Role['slug'],
    options?: findOptions,
  ): Promise<NullableType<Role>>;

  abstract update(
    id: Role['id'],
    payload: DeepPartial<Role>,
  ): Promise<Role | null>;

  abstract remove(id: Role['id']): Promise<void>;
}
