import { Injectable, Inject, NotFoundException, Scope } from '@nestjs/common';
import {
  Repository,
  FindOptionsRelations,
  DataSource,
  FindOneOptions,
  FindOptionsWhere,
  Like,
} from 'typeorm';
import { ScheduleEntity } from '../entities/schedule.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Schedule } from '../../../../domain/schedule';
import { ScheduleRepository } from '../../schedule.repository';
import { ScheduleMapper } from '../mappers/schedule.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/schedules/schedules.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { REQUEST } from '@nestjs/core';
import { formatOrder } from 'src/utils/utils';
import {
  FilterSchedulesDto,
  SortSchedulesDto,
} from 'src/schedules/dto/find-all-schedules.dto';

@Injectable({ scope: Scope.REQUEST })
export class ScheduleRelationalRepository
  extends BaseRepository
  implements ScheduleRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get scheduleRepository(): Repository<ScheduleEntity> {
    return this.getRepository(ScheduleEntity);
  }

  private relations: FindOptionsRelations<ScheduleEntity> = {};

  async create(data: Schedule): Promise<Schedule> {
    const persistenceModel = ScheduleMapper.toPersistence(data);
    const newEntity = await this.scheduleRepository.save(
      this.scheduleRepository.create(persistenceModel),
    );
    return ScheduleMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions & { withEmployees?: boolean };
    sortOptions?: SortSchedulesDto[] | null;
    filterOptions?: FilterSchedulesDto | null;
  }): Promise<PaginationResponseDto<Schedule>> {
    let where: FindOptionsWhere<ScheduleEntity> = {};
    if (filterOptions?.search) {
      where = {
        ...where,
        name: Like(`%${filterOptions.search}%`),
      };
    }

    let order: FindOneOptions<ScheduleEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options) relations = {};
    if (options?.withEmployees) {
      relations = {
        ...relations,
        employees: true,
      };
    }
    if (options?.minimal) relations = {};

    const [entities, count] = await this.scheduleRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
      where,
      order,
    });
    const items = entities.map((entity) => ScheduleMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'schedules',
      },
    );
  }

  async findById(
    id: Schedule['id'],
    options?: findOptions & { withEmployees?: boolean },
  ): Promise<NullableType<Schedule>> {
    let relations = this.relations;
    if (options) relations = {};
    if (options?.withEmployees) {
      relations = {
        ...relations,
        employees: true,
      };
    }
    if (options?.minimal) relations = {};

    const entity = await this.scheduleRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? ScheduleMapper.toDomain(entity) : null;
  }

  async update(
    id: Schedule['id'],
    payload: Partial<Schedule>,
  ): Promise<Schedule> {
    const entity = await this.scheduleRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.scheduleRepository.save(
      this.scheduleRepository.create(
        ScheduleMapper.toPersistence({
          ...ScheduleMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ScheduleMapper.toDomain(updatedEntity);
  }

  async remove(id: Schedule['id']): Promise<void> {
    await this.scheduleRepository.delete(id);
  }
}
