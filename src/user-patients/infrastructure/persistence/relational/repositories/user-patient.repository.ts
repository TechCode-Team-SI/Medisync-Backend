import { Injectable, Inject, NotFoundException, Scope } from '@nestjs/common';
import {
  Repository,
  FindOptionsRelations,
  DataSource,
  FindOneOptions,
  FindOptionsWhere,
  Like,
} from 'typeorm';
import { UserPatientEntity } from '../entities/user-patient.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { UserPatient } from '../../../../domain/user-patient';
import { UserPatientRepository } from '../../user-patient.repository';
import { UserPatientMapper } from '../mappers/user-patient.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/user-patients/user-patients.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { REQUEST } from '@nestjs/core';
import { formatOrder } from 'src/utils/utils';
import {
  FilterUserPatientsDto,
  SortUserPatientsDto,
} from 'src/user-patients/dto/find-all-user-patients.dto';

@Injectable({ scope: Scope.REQUEST })
export class UserPatientRelationalRepository
  extends BaseRepository
  implements UserPatientRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get userPatientRepository(): Repository<UserPatientEntity> {
    return this.getRepository(UserPatientEntity);
  }

  private relations: FindOptionsRelations<UserPatientEntity> = {};

  async create(data: UserPatient): Promise<UserPatient> {
    const persistenceModel = UserPatientMapper.toPersistence(data);
    const newEntity = await this.userPatientRepository.save(
      this.userPatientRepository.create(persistenceModel),
    );
    return UserPatientMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortUserPatientsDto[] | null;
    filterOptions?: FilterUserPatientsDto | null;
  }): Promise<PaginationResponseDto<UserPatient>> {
    let where: FindOptionsWhere<UserPatientEntity> = {};
    if (filterOptions?.search) {
      where = {
        ...where,
        fullName: Like(`%${filterOptions.search}%`),
      };
    }
    if (filterOptions?.userId) {
      where = {
        ...where,
        user: {
          id: filterOptions.userId,
        },
      };
    }
    let order: FindOneOptions<UserPatientEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.userPatientRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
      order,
      where,
    });
    const items = entities.map((entity) => UserPatientMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'user-patients',
      },
    );
  }

  async findById(
    id: UserPatient['id'],
    options?: findOptions,
  ): Promise<NullableType<UserPatient>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.userPatientRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? UserPatientMapper.toDomain(entity) : null;
  }

  async update(
    id: UserPatient['id'],
    payload: Partial<UserPatient>,
  ): Promise<UserPatient> {
    const entity = await this.userPatientRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.userPatientRepository.save(
      this.userPatientRepository.create(
        UserPatientMapper.toPersistence({
          ...UserPatientMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return UserPatientMapper.toDomain(updatedEntity);
  }

  async remove(id: UserPatient['id']): Promise<void> {
    await this.userPatientRepository.delete(id);
  }
}
