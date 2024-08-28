import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Permission } from '../../domain/permission';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';

export abstract class PermissionRepository extends BaseRepository {
  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Permission>>;

  abstract findById(
    id: Permission['id'],
    options?: findOptions,
  ): Promise<NullableType<Permission>>;

  abstract findAllByRoles(
    roles: string[],
    options?: findOptions,
  ): Promise<Permission[]>;
}
