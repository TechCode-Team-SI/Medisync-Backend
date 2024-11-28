import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { SelectionEntity } from 'src/field-questions/infrastructure/persistence/relational/entities/selection.entity';
import { SortStatisticsMetadataDto } from 'src/statistics-metadata/dto/find-all-statistics-metadata.dto';
import {
  FilteredByType,
  ChartType,
} from 'src/statistics-metadata/statistics-metadata.enum';
import { exceptionResponses } from 'src/statistics-metadata/statistics-metadata.messages';
import {
  AvailableFieldQuestion,
  AvailableSpecialty,
  Chart,
} from 'src/statistics-metadata/statistics-metadata.type';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { formatOrder } from 'src/utils/utils';
import {
  DataSource,
  FindOneOptions,
  FindOptionsRelations,
  Repository,
} from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { StatisticsMetadata } from '../../../../domain/statistics-metadata';
import { StatisticsMetadataRepository } from '../../statistics-metadata.repository';
import { StatisticsMetadataEntity } from '../entities/statistics-metadata.entity';
import { StatisticsMetadataMapper } from '../mappers/statistics-metadata.mapper';
import { RequestValueEntity } from 'src/requests/infrastructure/persistence/relational/entities/request-value.entity';
import { FilterAvailableFieldQuestions } from 'src/statistics-metadata/dto/get-avalable-field-questions.dto';
import { FilterAvailableSpecialties } from 'src/statistics-metadata/dto/get-available-specialties.dto';
import { StatisticsDateDto } from 'src/statistics/dto/statistics-date.dto';
import { dateGroupingQuery, dateRangeQuery } from 'src/utils/statistics-utils';

@Injectable({ scope: Scope.REQUEST })
export class StatisticsMetadataRelationalRepository
  extends BaseRepository
  implements StatisticsMetadataRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get statisticsMetadataRepository(): Repository<StatisticsMetadataEntity> {
    return this.getRepository(StatisticsMetadataEntity);
  }

  private relations: FindOptionsRelations<StatisticsMetadataEntity> = {
    fieldQuestion: true,
  };

  async create(data: StatisticsMetadata): Promise<StatisticsMetadata> {
    const persistenceModel = StatisticsMetadataMapper.toPersistence(data);
    const newEntity = await this.statisticsMetadataRepository.save(
      this.statisticsMetadataRepository.create(persistenceModel),
    );
    return StatisticsMetadataMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortStatisticsMetadataDto[] | null;
  }): Promise<PaginationResponseDto<StatisticsMetadata>> {
    let order: FindOneOptions<StatisticsMetadataEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] =
      await this.statisticsMetadataRepository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        relations,
        order,
      });
    const items = entities.map((entity) =>
      StatisticsMetadataMapper.toDomain(entity),
    );

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'statistics-metadata',
      },
    );
  }

  async findById(
    id: StatisticsMetadata['id'],
    options?: findOptions,
  ): Promise<NullableType<StatisticsMetadata>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.statisticsMetadataRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? StatisticsMetadataMapper.toDomain(entity) : null;
  }

  async update(
    id: StatisticsMetadata['id'],
    payload: Partial<StatisticsMetadata>,
  ): Promise<StatisticsMetadata> {
    const entity = await this.statisticsMetadataRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.statisticsMetadataRepository.save(
      this.statisticsMetadataRepository.create(
        StatisticsMetadataMapper.toPersistence({
          ...StatisticsMetadataMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return StatisticsMetadataMapper.toDomain(updatedEntity);
  }

  async remove(id: StatisticsMetadata['id']): Promise<void> {
    await this.statisticsMetadataRepository.delete(id);
  }

  async findAll({
    options,
    sortOptions,
  }: {
    options?: findOptions;
    sortOptions?: SortStatisticsMetadataDto[] | null;
  }): Promise<StatisticsMetadata[]> {
    let order: FindOneOptions<StatisticsMetadataEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entities = await this.statisticsMetadataRepository.find({
      relations,
      order,
    });
    const items = entities.map((entity) =>
      StatisticsMetadataMapper.toDomain(entity),
    );

    return items;
  }

  async genPieMetadata(
    metadata: StatisticsMetadata,
    date: StatisticsDateDto,
  ): Promise<Chart> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(SelectionEntity)
      .createQueryBuilder('s')
      .innerJoin('s.requestValues', 'rv')
      .innerJoin('rv.request', 'r')
      .innerJoin('s.fieldQuestion', 'fq')
      .where('r.status <> :status', { status: 'cancelled' })
      .where('fq.id = :fqId', { fqId: metadata.fieldQuestion?.id })
      .groupBy('s.id')
      .select(['s.id AS selectionId', 's.value AS value']);

    switch (metadata.filteredByType) {
      case FilteredByType.SPECIALTY:
        query
          .addSelect('SUM(if(r.requestedSpecialtyId = :filter, 1, 0)) AS count')
          .setParameter('filter', metadata.filter);
        break;
      case FilteredByType.NONE:
        query.addSelect('COUNT(s.id) AS count');
        break;
    }

    if (date?.from || date?.to) {
      const dateRange = dateRangeQuery(date);
      query.where(`DATE(r.createdAt) ${dateRange}`);
    }

    const entities = await query.getRawMany();

    const result: Chart = {
      type: ChartType.PIE,
      title: metadata.label,
      description: metadata.fieldQuestion?.label || '',
      data: entities.map((entity) => ({
        category: entity.value || '',
        value: Number(entity.count) || 0,
      })),
    };

    return result;
  }

  async genBarMetadata(
    metadata: StatisticsMetadata,
    date: StatisticsDateDto,
  ): Promise<Chart> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(SelectionEntity)
      .createQueryBuilder('s')
      .innerJoin('s.requestValues', 'rv')
      .innerJoin('rv.request', 'r')
      .innerJoin('s.fieldQuestion', 'fq')
      .where('r.status <> :status', { status: 'cancelled' })
      .where('fq.id = :fqId', { fqId: metadata.fieldQuestion?.id })
      .groupBy('s.id')
      .select(['s.id AS selectionId', 's.value AS value']);

    switch (metadata.filteredByType) {
      case FilteredByType.SPECIALTY:
        query
          .addSelect('SUM(if(r.requestedSpecialtyId = :filter, 1, 0)) AS count')
          .setParameter('filter', metadata.filter);
        break;
      case FilteredByType.NONE:
        query.addSelect('COUNT(s.id) AS count');
        break;
    }

    if (date?.from || date?.to) {
      const dateRange = dateRangeQuery(date);
      query.where(`DATE(r.createdAt) ${dateRange}`);
    }

    if (date?.grouping) {
      const dateGrouping = dateGroupingQuery(date.grouping);
      query.addSelect(
        `DATE_FORMAT(r.createdAt, ${dateGrouping}) AS dateFormatted`,
      );
      query.groupBy('dateFormatted');
      query.orderBy('dateFormatted');
    }

    const entities = await query.getRawMany();

    const result: Chart = {
      type: ChartType.BAR,
      title: metadata.label,
      description: metadata.fieldQuestion?.label || '',
      data: entities.map((entity) => ({
        category: date.grouping ? entity.dateFormatted : entity.value,
        value: Number(entity.count) || 0,
      })),
    };

    return result;
  }

  async getAvailableSpecialtiesForGraph(
    fieldQuestionId: string,
    {
      paginationOptions,
      filterOptions,
    }: {
      filterOptions?: FilterAvailableSpecialties | null;
      paginationOptions: IPaginationOptions;
    },
  ): Promise<PaginationResponseDto<AvailableSpecialty>> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(RequestValueEntity)
      .createQueryBuilder('rv')
      .innerJoin('rv.request', 'r')
      .innerJoin('r.requestedSpecialty', 'specialty')
      .innerJoin('rv.fieldQuestion', 'fq')
      .where('r.status <> :status', { status: 'cancelled' })
      .where('fq.id = :fqId', { fqId: fieldQuestionId })
      .groupBy('specialty.id, specialty.name')
      .select(['specialty.id as id', 'specialty.name as name']);

    if (filterOptions?.search) {
      query.andWhere('specialty.name LIKE :search', {
        search: `%${filterOptions.search}%`,
      });
    }

    const count = await query.getCount();

    query
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const items: AvailableSpecialty[] = await query.getRawMany();

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'statistics-metadata',
      },
    );
  }

  async getAvailableFieldQuestionsForGraph({
    paginationOptions,
    filterOptions,
  }: {
    filterOptions?: FilterAvailableFieldQuestions | null;
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationResponseDto<AvailableFieldQuestion>> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(RequestValueEntity)
      .createQueryBuilder('rv')
      .innerJoin('rv.request', 'r')
      .innerJoin('rv.fieldQuestion', 'fq')
      .where('r.status <> :status', { status: 'cancelled' })
      .groupBy('fq.id, fq.name, fq.type')
      .select(['fq.id as id', 'fq.name as name, fq.type as type']);

    if (filterOptions?.search) {
      query.andWhere('fq.name LIKE :search', {
        search: `%${filterOptions.search}%`,
      });
    }
    if (filterOptions?.type) {
      query.andWhere('fq.type = :type', { type: filterOptions.type });
    }

    const count = await query.getCount();

    query
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const items: AvailableFieldQuestion[] = await query.getRawMany();

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'statistics-metadata',
      },
    );
  }
}
