import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Permission } from '../../../../domain/permission';
import { PermissionRepository } from '../../permission.repository';
import { PermissionEntity } from '../entities/permission.entity';
import { PermissionMapper } from '../mappers/permission.mapper';
@Injectable()
export class permissionRelationalRepository implements PermissionRepository {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly PermissionRepository: Repository<PermissionEntity>,
  ) {}

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Permission[]> {
    const permissions = await this.PermissionRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return permissions.map((user) => PermissionMapper.toDomain(user));
  }

  async findById(id: Permission['id']): Promise<NullableType<Permission>> {
    const permission = await this.PermissionRepository.findOne({
      where: { id },
    });

    return permission ? PermissionMapper.toDomain(permission) : null;
  }
}
