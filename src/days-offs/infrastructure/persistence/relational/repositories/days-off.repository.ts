import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { exceptionResponses } from 'src/days-offs/days-offs.messages';
import {
  FilterDaysOffsDto,
  SortDaysOffsDto,
} from 'src/days-offs/dto/find-all-days-offs.dto';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { formatOrder } from 'src/utils/utils';
import {
  Brackets,
  DataSource,
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { DaysOff } from '../../../../domain/days-off';
import { DaysOffRepository } from '../../days-off.repository';
import { DaysOffEntity } from '../entities/days-off.entity';
import { DaysOffMapper } from '../mappers/days-off.mapper';

@Injectable({ scope: Scope.REQUEST })
export class DaysOffRelationalRepository
  extends BaseRepository
  implements DaysOffRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get daysOffRepository(): Repository<DaysOffEntity> {
    return this.getRepository(DaysOffEntity);
  }

  private relations: FindOptionsRelations<DaysOffEntity> = {};

  async create(data: DaysOff): Promise<DaysOff> {
    const persistenceModel = DaysOffMapper.toPersistence(data);
    const newEntity = await this.daysOffRepository.save(
      this.daysOffRepository.create(persistenceModel),
    );
    return DaysOffMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortDaysOffsDto[] | null;
    filterOptions?: FilterDaysOffsDto | null;
  }): Promise<PaginationResponseDto<DaysOff>> {
    let where: FindOptionsWhere<DaysOffEntity> = {};
    if (filterOptions?.agendaIds) {
      where = { ...where, agenda: { id: In(filterOptions.agendaIds) } };
    }
    if (filterOptions?.specialtyIds) {
      where = { ...where, specialty: { id: In(filterOptions.specialtyIds) } };
    }
    if (filterOptions?.employeeIds) {
      where = {
        ...where,
        employeeProfile: { id: In(filterOptions.employeeIds) },
      };
    }

    let order: FindOneOptions<DaysOffEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.daysOffRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where,
      relations,
      order,
    });
    const items = entities.map((entity) => DaysOffMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'days-offs',
      },
    );
  }

  async findAllDaysOffs(props: {
    employeeProfileId?: string | null;
    agendaId?: string | null;
    specialtyId?: string | null;
    startDate: Date;
    endDate: Date;
  }): Promise<DaysOff[]> {
    const entityFiltering = new Brackets((qb) => {
      if (props.employeeProfileId) {
        qb.orWhere('daysOff.employeeProfileId = :employeeProfileId', {
          employeeProfileId: props.employeeProfileId,
        });
      }
      if (props.agendaId) {
        qb.orWhere('daysOff.agendaId = :agendaId', {
          agendaId: props.agendaId,
        });
      }
      if (props.specialtyId) {
        qb.orWhere('daysOff.specialtyId = :specialtyId', {
          specialtyId: props.specialtyId,
        });
      }
    });
    const entityManager = this.getEntityManager();
    const entities = await entityManager
      .getRepository(DaysOffEntity)
      .createQueryBuilder('daysOff')
      .orWhere(
        new Brackets((qb) => {
          qb.where(':from between daysOff.from and daysOff.to', {
            from: props.startDate,
          }).andWhere(entityFiltering);
        }),
      )
      .orWhere(
        new Brackets((qb) => {
          qb.where(':to between daysOff.from and daysOff.to', {
            to: props.endDate,
          }).andWhere(entityFiltering);
        }),
      )
      .orWhere(
        new Brackets((qb) => {
          qb.where(':from < daysOff.from and :to > daysOff.to', {
            from: props.endDate,
            to: props.endDate,
          }).andWhere(entityFiltering);
        }),
      )
      .select([
        'id',
        'daysOff.from as `from`',
        'daysOff.to as `to`',
        'createdAt',
        'updatedAt',
      ])
      .getRawMany();

    const items = entities.map((entity) => DaysOffMapper.toDomain(entity));

    return items;
  }

  async findById(
    id: DaysOff['id'],
    options?: findOptions,
  ): Promise<NullableType<DaysOff>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.daysOffRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? DaysOffMapper.toDomain(entity) : null;
  }

  async update(id: DaysOff['id'], payload: Partial<DaysOff>): Promise<DaysOff> {
    const entity = await this.daysOffRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.daysOffRepository.save(
      this.daysOffRepository.create(
        DaysOffMapper.toPersistence({
          ...DaysOffMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return DaysOffMapper.toDomain(updatedEntity);
  }

  async remove(id: DaysOff['id']): Promise<void> {
    await this.daysOffRepository.delete(id);
  }
}
