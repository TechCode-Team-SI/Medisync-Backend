import { Injectable, Inject, NotFoundException, Scope } from '@nestjs/common';
import {
  Repository,
  FindOptionsRelations,
  DataSource,
  FindOneOptions,
  In,
  FindOptionsWhere,
  Like,
} from 'typeorm';
import { TreatmentEntity } from '../entities/treatment.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Treatment } from '../../../../domain/treatment';
import { TreatmentRepository } from '../../treatment.repository';
import { TreatmentMapper } from '../mappers/treatment.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/treatments/treatments.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { REQUEST } from '@nestjs/core';
import { formatOrder } from 'src/utils/utils';
import {
  FilterTreatmentsDto,
  SortTreatmentsDto,
} from 'src/treatments/dto/find-all-treatments.dto';

@Injectable({ scope: Scope.REQUEST })
export class TreatmentRelationalRepository
  extends BaseRepository
  implements TreatmentRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get treatmentRepository(): Repository<TreatmentEntity> {
    return this.getRepository(TreatmentEntity);
  }

  private relations: FindOptionsRelations<TreatmentEntity> = {};

  async create(data: Treatment): Promise<Treatment> {
    const persistenceModel = TreatmentMapper.toPersistence(data);
    const newEntity = await this.treatmentRepository.save(
      this.treatmentRepository.create(persistenceModel),
    );
    return TreatmentMapper.toDomain(newEntity);
  }

  async createMultiple(data: Treatment[]): Promise<Treatment[]> {
    const persistenceModels = data.map((specialty) =>
      TreatmentMapper.toPersistence(specialty),
    );
    const newEntities = await this.treatmentRepository.save(
      this.treatmentRepository.create(persistenceModels),
    );
    return newEntities.map((newEntity) => TreatmentMapper.toDomain(newEntity));
  }

  async findAllWithNames(
    names: Treatment['name'][],
    options?: findOptions,
  ): Promise<Treatment[]> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entities = await this.treatmentRepository.find({
      where: { name: In(names) },
      relations,
    });

    return entities.map((entity) => TreatmentMapper.toDomain(entity));
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortTreatmentsDto[] | null;
    filterOptions?: FilterTreatmentsDto | null;
  }): Promise<PaginationResponseDto<Treatment>> {
    let where: FindOptionsWhere<TreatmentEntity> = {};
    if (filterOptions?.search) {
      where = {
        ...where,
        name: Like(`%${filterOptions.search}%`),
      };
    }
    let order: FindOneOptions<TreatmentEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.treatmentRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
      order,
      where,
    });
    const items = entities.map((entity) => TreatmentMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'treatments',
      },
    );
  }

  async findManyByIds(
    ids: string[],
    options?: findOptions,
  ): Promise<Treatment[]> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entities = await this.treatmentRepository.find({
      where: { id: In(ids) },
      relations,
    });
    return entities.map((illness) => TreatmentMapper.toDomain(illness));
  }

  async findById(
    id: Treatment['id'],
    options?: findOptions,
  ): Promise<NullableType<Treatment>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.treatmentRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? TreatmentMapper.toDomain(entity) : null;
  }

  async update(
    id: Treatment['id'],
    payload: Partial<Treatment>,
  ): Promise<Treatment> {
    const entity = await this.treatmentRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.treatmentRepository.save(
      this.treatmentRepository.create(
        TreatmentMapper.toPersistence({
          ...TreatmentMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TreatmentMapper.toDomain(updatedEntity);
  }

  async remove(id: Treatment['id']): Promise<void> {
    await this.treatmentRepository.delete(id);
  }
}
