import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { exceptionResponses } from 'src/users/users.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import {
  DataSource,
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  IsNull,
  Like,
  Not,
  Repository,
} from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { User } from '../../../../domain/user';
import { FilterUserDto, SortUserDto } from '../../../../dto/query-user.dto';
import { UserRepository } from '../../user.repository';
import { UserEntity } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { formatOrder } from 'src/utils/utils';

@Injectable({ scope: Scope.REQUEST })
export class UsersRelationalRepository
  extends BaseRepository
  implements UserRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get usersRepository(): Repository<UserEntity> {
    return this.getRepository(UserEntity);
  }

  private relations: FindOptionsRelations<UserEntity> = {
    roles: true,
    employeeProfile: {
      schedule: true,
      specialties: true,
    },
  };

  async create(data: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(data);
    const newEntity = await this.usersRepository.save(
      this.usersRepository.create(persistenceModel),
    );
    return UserMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    options,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
    options?: findOptions & { employeeProfile: boolean; specialties: boolean };
  }): Promise<PaginationResponseDto<User>> {
    let order: FindOneOptions<UserEntity>['order'] = { createdAt: 'DESC' };
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options) relations = {};
    if (options?.employeeProfile)
      relations = { ...relations, employeeProfile: true };
    if (options?.specialties) {
      relations = {
        ...relations,
        employeeProfile: {
          specialties: true,
        },
      };
    }
    if (options?.minimal) relations = {};

    let where: FindOptionsWhere<UserEntity> = {};
    if (filterOptions?.roleIds && filterOptions.roleIds.length > 0) {
      where = { ...where, roles: { id: In(filterOptions.roleIds) } };
    }
    if (filterOptions?.specialtyIds && filterOptions.specialtyIds.length > 0) {
      where = {
        ...where,
        employeeProfile: {
          specialties: { id: In(filterOptions.specialtyIds) },
        },
      };
    }
    if (filterOptions?.search) {
      where = { ...where, fullName: Like(`%${filterOptions?.search}%`) };
    }
    if (filterOptions?.onlyEmployee !== undefined) {
      switch (filterOptions.onlyEmployee) {
        case true:
          where = {
            ...where,
            employeeProfile: { id: Not(IsNull()) },
          };
          break;
        default:
          where = {
            ...where,
            employeeProfile: { id: IsNull() },
          };
      }
    }
    if (filterOptions?.status !== undefined) {
      where = {
        ...where,
        employeeProfile: {
          status: filterOptions.status,
        },
      };
    }

    const [entities, count] = await this.usersRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      loadEagerRelations: true,
      relations,
      where,
      order,
    });
    const items = entities.map((entity) => UserMapper.toDomain(entity));

    return Pagination(
      { items, count },
      { ...paginationOptions, domain: 'users' },
    );
  }

  async findAll({
    filterOptions,
    sortOptions,
    options,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    options?: findOptions & { employeeProfile: boolean };
  }): Promise<User[]> {
    let order: FindOneOptions<UserEntity>['order'] = { createdAt: 'DESC' };
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options) relations = {};
    if (options?.employeeProfile)
      relations = { ...relations, employeeProfile: true };
    if (options?.minimal) relations = {};

    let where: FindOptionsWhere<UserEntity> = {};
    if (filterOptions?.roleIds && filterOptions.roleIds.length > 0) {
      where = { ...where, roles: { id: In(filterOptions.roleIds) } };
    }
    if (
      filterOptions?.permissionSlugs &&
      filterOptions.permissionSlugs.length > 0
    ) {
      let rolesWhere = {};
      if (where.roles) {
        rolesWhere = where.roles;
      }
      where = {
        ...where,
        roles: {
          ...rolesWhere,
          permissions: { slug: In(filterOptions.permissionSlugs) },
        },
      };
    }
    if (filterOptions?.specialtyIds && filterOptions.specialtyIds.length > 0) {
      where = {
        ...where,
        employeeProfile: {
          specialties: { id: In(filterOptions.specialtyIds) },
        },
      };
    }
    if (filterOptions?.onlyEmployee !== undefined) {
      switch (filterOptions.onlyEmployee) {
        case true:
          where = {
            ...where,
            employeeProfile: { id: Not(IsNull()) },
          };
          break;
        default:
          where = {
            ...where,
            employeeProfile: { id: IsNull() },
          };
      }
    }
    if (filterOptions?.status !== undefined) {
      where = {
        ...where,
        employeeProfile: {
          status: filterOptions.status,
        },
      };
    }
    if (filterOptions?.search) {
      where = { ...where, fullName: Like(`%${filterOptions?.search}%`) };
    }

    const entities = await this.usersRepository.find({
      loadEagerRelations: true,
      relations,
      where,
      order,
    });
    const items = entities.map((entity) => UserMapper.toDomain(entity));

    return items;
  }

  async findById(
    id: User['id'],
    options?: findOptions & {
      withProfile?: boolean;
      withSpecialty?: boolean;
      withUserPatients?: boolean;
    },
  ): Promise<NullableType<User>> {
    let relations = this.relations;
    if (options) relations = {};
    if (options?.withProfile) {
      relations.employeeProfile = true;
    }
    if (options?.withSpecialty) {
      relations.employeeProfile = {
        specialties: true,
      };
    }
    if (options?.withUserPatients) {
      relations.userPatients = true;
    }
    if (options?.minimal) relations = {};
    const entity = await this.usersRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findAvailableSchedule(id: User['id']): Promise<NullableType<User>> {
    const entity = await this.usersRepository.findOne({
      where: { id },
      relations: {
        employeeProfile: {
          schedule: true,
          agenda: true,
        },
      },
    });

    return entity ? UserMapper.toDomain(entity) : null;
  }

  async count(): Promise<number> {
    return this.usersRepository.count();
  }

  async findByEmail(
    email: User['email'],
    options?: findOptions,
  ): Promise<NullableType<User>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.usersRepository.findOne({
      where: { email },
      relations,
    });

    return entity ? UserMapper.toDomain(entity) : null;
  }

  async update(id: User['id'], payload: Partial<User>): Promise<User> {
    const entity = await this.usersRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedUser = await this.usersRepository.create(
      UserMapper.toPersistence({
        ...UserMapper.toDomain(entity),
        ...payload,
      }),
    );

    const updatedEntity = await this.usersRepository.save(updatedUser);

    return UserMapper.toDomain(updatedEntity);
  }

  async remove(id: User['id']): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
