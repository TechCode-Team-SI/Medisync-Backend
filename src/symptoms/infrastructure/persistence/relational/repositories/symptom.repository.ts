import { Injectable, Inject, NotFoundException, Scope } from '@nestjs/common';
import {
  Repository,
  FindOptionsRelations,
  DataSource,
  FindOneOptions,
  In,
} from 'typeorm';
import { SymptomEntity } from '../entities/symptom.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Symptom } from '../../../../domain/symptom';
import { SymptomRepository } from '../../symptom.repository';
import { SymptomMapper } from '../mappers/symptom.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/symptoms/symptoms.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { REQUEST } from '@nestjs/core';
import { formatOrder } from 'src/utils/utils';
import { SortSymptomsDto } from 'src/symptoms/dto/find-all-symptoms.dto';

@Injectable({ scope: Scope.REQUEST })
export class SymptomRelationalRepository
  extends BaseRepository
  implements SymptomRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get symptomRepository(): Repository<SymptomEntity> {
    return this.getRepository(SymptomEntity);
  }

  private relations: FindOptionsRelations<SymptomEntity> = {};

  async create(data: Symptom): Promise<Symptom> {
    const persistenceModel = SymptomMapper.toPersistence(data);
    const newEntity = await this.symptomRepository.save(
      this.symptomRepository.create(persistenceModel),
    );
    return SymptomMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortSymptomsDto[] | null;
  }): Promise<PaginationResponseDto<Symptom>> {
    let order: FindOneOptions<SymptomEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.symptomRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
      order,
    });
    const items = entities.map((entity) => SymptomMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'symptoms',
      },
    );
  }

  async findManyByIds(
    ids: string[],
    options?: findOptions,
  ): Promise<Symptom[]> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entities = await this.symptomRepository.find({
      where: { id: In(ids) },
      relations,
    });
    return entities.map((symptoms) => SymptomMapper.toDomain(symptoms));
  }

  async findById(
    id: Symptom['id'],
    options?: findOptions,
  ): Promise<NullableType<Symptom>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.symptomRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? SymptomMapper.toDomain(entity) : null;
  }

  async update(id: Symptom['id'], payload: Partial<Symptom>): Promise<Symptom> {
    const entity = await this.symptomRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.symptomRepository.save(
      this.symptomRepository.create(
        SymptomMapper.toPersistence({
          ...SymptomMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SymptomMapper.toDomain(updatedEntity);
  }

  async remove(id: Symptom['id']): Promise<void> {
    await this.symptomRepository.delete(id);
  }
}
