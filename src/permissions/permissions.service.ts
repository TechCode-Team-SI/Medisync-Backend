import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Permission } from './domain/permission';
import { PermissionRepository } from './infrastructure/persistence/permission.repository';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class PermissionsService {
  constructor(private readonly PermissionRepository: PermissionRepository) {}

  findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }) {
    return this.PermissionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
    });
  }

  findOne(id: Permission['id'], options?: findOptions) {
    return this.PermissionRepository.findById(id, options);
  }
}
