import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Permission } from './domain/permission';
import { PermissionRepository } from './infrastructure/persistence/permission.repository';

@Injectable()
export class PermissionsService {
  constructor(private readonly PermissionRepository: PermissionRepository) {}

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.PermissionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Permission['id']) {
    return this.PermissionRepository.findById(id);
  }
}
