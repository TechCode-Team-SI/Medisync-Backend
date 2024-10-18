import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { SelectionEntity } from 'src/field-questions/infrastructure/persistence/relational/entities/selection.entity';
import { SortStatisticsMetadataDto } from 'src/statistics-metadata/dto/find-all-statistics-metadata.dto';
import { FilteredByType } from 'src/statistics-metadata/statistics-metadata.enum';
import { exceptionResponses } from 'src/statistics-metadata/statistics-metadata.messages';
import { Tart } from 'src/statistics-metadata/statistics-metadata.type';
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

  async genTartMetadata(metadata: StatisticsMetadata): Promise<Tart> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(SelectionEntity)
      .createQueryBuilder('s')
      .innerJoin('s.requestValues', 'rv')
      .innerJoin('rv.request', 'r')
      .innerJoin('s.fieldQuestion', 'fq')
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

    const entities = await query.getRawMany();

    const totalCount = entities.reduce((acc, entity) => acc + +entity.count, 0);

    const result: Tart = {
      label: metadata.label,
      description: metadata.fieldQuestion?.label || '',
      data: entities.map((entity) => ({
        label: entity.value,
        probabilities:
          Number(((entity.count / totalCount) * 100).toFixed(2)) || 0,
      })),
    };

    return result;
  }
}
