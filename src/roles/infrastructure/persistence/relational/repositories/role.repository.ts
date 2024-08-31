import {
  Inject,
  Injectable,
  NotFoundException,
  Scope,
  UnprocessableEntityException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { exceptionResponses } from 'src/roles/roles.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import {
  DataSource,
  FindOneOptions,
  FindOptionsRelations,
  In,
  Repository,
} from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Role } from '../../../../domain/role';
import { RoleRepository } from '../../role.repository';
import { RoleEntity } from '../entities/role.entity';
import { RoleMapper } from '../mappers/role.mapper';
import { SortRoleDto } from 'src/roles/dto/find-all-roles.dto';
import { formatOrder } from 'src/utils/utils';

@Injectable({ scope: Scope.REQUEST })
export class RoleRelationalRepository
  extends BaseRepository
  implements RoleRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get roleRepository(): Repository<RoleEntity> {
    return this.getRepository(RoleEntity);
  }

  private relations: FindOptionsRelations<RoleEntity> = {
    users: true,
    permissions: true,
  };

  async create(data: Role): Promise<Role> {
    const persistenceModel = RoleMapper.toPersistence(data);

    try {
      const newEntity = await this.roleRepository.save(
        this.roleRepository.create(persistenceModel),
      );
      return RoleMapper.toDomain(newEntity);
    } catch (error) {
      if (error.errno === 1452) {
        throw new UnprocessableEntityException(
          exceptionResponses.PermissionNotExist,
        );
      }
      throw new UnprocessableEntityException(exceptionResponses.AlreadyExists);
    }
  }

  async findManyByIds(ids: string[], options?: findOptions): Promise<Role[]> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entities = await this.roleRepository.find({
      where: { id: In(ids) },
      relations,
    });
    return entities.map((role) => RoleMapper.toDomain(role));
  }

  async findManyBySlugs(
    slugs: string[],
    options?: findOptions,
  ): Promise<Role[]> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entities = await this.roleRepository.find({
      where: { id: In(slugs) },
      relations,
    });
    return entities.map((role) => RoleMapper.toDomain(role));
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortRoleDto[] | null;
  }): Promise<PaginationResponseDto<Role>> {
    let order: FindOneOptions<RoleEntity>['order'] = { createdAt: 'DESC' };
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.roleRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
      order,
    });
    const items = entities.map((entity) => RoleMapper.toDomain(entity));

    return Pagination(
      { items, count },
      { ...paginationOptions, domain: 'roles' },
    );
  }

  async findById(
    id: Role['id'],
    options?: findOptions,
  ): Promise<NullableType<Role>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.roleRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? RoleMapper.toDomain(entity) : null;
  }

  async findBySlug(
    slug: Role['slug'],
    options?: findOptions,
  ): Promise<NullableType<Role>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.roleRepository.findOne({
      where: { slug },
      relations,
    });

    return entity ? RoleMapper.toDomain(entity) : null;
  }

  async update(id: Role['id'], payload: Partial<Role>): Promise<Role> {
    const entity = await this.findById(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }
    if (!entity.isMutable) {
      throw new UnprocessableEntityException(exceptionResponses.Inmutable);
    }

    const updatedEntity = await this.roleRepository.save(
      this.roleRepository.create(
        RoleMapper.toPersistence({
          ...entity,
          ...payload,
        }),
      ),
    );

    return RoleMapper.toDomain(updatedEntity);
  }

  async remove(id: Role['id']): Promise<void> {
    const entity = await this.findById(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }
    if (!entity.isMutable) {
      throw new UnprocessableEntityException(exceptionResponses.Inmutable);
    }

    await this.roleRepository.delete(id);
  }
}
