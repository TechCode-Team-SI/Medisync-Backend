import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Permission } from './domain/permission';
import { PermissionRepository } from './infrastructure/persistence/permission.repository';
import { findOptions } from 'src/utils/types/fine-options.type';
import { SortPermissionDto } from './dto/find-all-permissions.dto';

@Injectable()
export class PermissionsService {
  constructor(private readonly PermissionRepository: PermissionRepository) {}

  findAllWithPagination({
    paginationOptions,
    options,
    search,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    search?: string;
    sortOptions?: SortPermissionDto[] | null;
  }) {
    return this.PermissionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      search,
      sortOptions,
    });
  }

  findOne(id: Permission['id'], options?: findOptions) {
    return this.PermissionRepository.findById(id, options);
  }

  findAllByRoleSlugs(roleSlugs: string[], options?: findOptions) {
    return this.PermissionRepository.findAllByRoles(roleSlugs, options);
  }
}
