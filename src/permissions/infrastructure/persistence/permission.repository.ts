import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Permission } from '../../domain/permission';

export abstract class PermissionRepository {
  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationResponseDto<Permission>>;

  abstract findById(id: Permission['id']): Promise<NullableType<Permission>>;
}
