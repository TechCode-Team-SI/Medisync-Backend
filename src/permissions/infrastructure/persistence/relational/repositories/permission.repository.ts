import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { DataSource, FindOptionsRelations, In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Permission } from '../../../../domain/permission';
import { PermissionRepository } from '../../permission.repository';
import { PermissionEntity } from '../entities/permission.entity';
import { PermissionMapper } from '../mappers/permission.mapper';
@Injectable({ scope: Scope.REQUEST })
export class permissionRelationalRepository
  extends BaseRepository
  implements PermissionRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get PermissionRepository(): Repository<PermissionEntity> {
    return this.getRepository(PermissionEntity);
  }

  private relations: FindOptionsRelations<PermissionEntity> = {};

  async findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Permission>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [permissions, count] = await this.PermissionRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
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

  async findById(
    id: Permission['id'],
    options?: findOptions,
  ): Promise<NullableType<Permission>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const permission = await this.PermissionRepository.findOne({
      where: { id },
      relations,
    });

    return permission ? PermissionMapper.toDomain(permission) : null;
  }

  async findAllByRoles(
    rolesSlug: string[],
    options?: findOptions,
  ): Promise<Permission[]> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const permissions = await this.PermissionRepository.find({
      where: {
        roles: {
          slug: In(rolesSlug),
        },
      },
      relations,
    });

    return permissions.map((permission) =>
      PermissionMapper.toDomain(permission),
    );
  }
}
