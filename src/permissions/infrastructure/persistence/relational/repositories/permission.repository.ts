import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Permission } from '../../../../domain/permission';
import { PermissionRepository } from '../../permission.repository';
import { PermissionEntity } from '../entities/permission.entity';
import { PermissionMapper } from '../mappers/permission.mapper';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
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
  }): Promise<PaginationResponseDto<Permission>> {
    const [permissions, count] = await this.PermissionRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
    const items = permissions.map((permission) =>
      PermissionMapper.toDomain(permission),
    );

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'permissions',
      },
    );
  }

  async findById(id: Permission['id']): Promise<NullableType<Permission>> {
    const permission = await this.PermissionRepository.findOne({
      where: { id },
    });

    return permission ? PermissionMapper.toDomain(permission) : null;
  }
}
