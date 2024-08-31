import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import {
  FilterFieldQuestionDto,
  SortFieldQuestionDto,
} from 'src/field-questions/dto/find-all-field-questions.dto';
import { exceptionResponses } from 'src/field-questions/field-questions.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { formatOrder } from 'src/utils/utils';
import {
  DataSource,
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  Like,
  Repository,
} from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { FieldQuestion } from '../../../../domain/field-question';
import { FieldQuestionRepository } from '../../field-question.repository';
import { FieldQuestionEntity } from '../entities/field-question.entity';
import { FieldQuestionMapper } from '../mappers/field-question.mapper';

@Injectable({ scope: Scope.REQUEST })
export class FieldQuestionRelationalRepository
  extends BaseRepository
  implements FieldQuestionRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get fieldQuestionRepository(): Repository<FieldQuestionEntity> {
    return this.getRepository(FieldQuestionEntity);
  }

  private relations: FindOptionsRelations<FieldQuestionEntity> = {
    selections: true,
    selectionConfig: true,
  };

  async create(data: FieldQuestion): Promise<FieldQuestion> {
    const persistenceModel = FieldQuestionMapper.toPersistence(data);
    const newEntity = await this.fieldQuestionRepository.save(
      this.fieldQuestionRepository.create(persistenceModel),
    );
    return FieldQuestionMapper.toDomain(newEntity);
  }

  async createMultiple(data: FieldQuestion[]): Promise<FieldQuestion[]> {
    const entities = data.map((item) => {
      const persistenceModel = FieldQuestionMapper.toPersistence(item);
      return this.fieldQuestionRepository.create(persistenceModel);
    });
    const newEntities = await this.fieldQuestionRepository.save(entities);
    return newEntities.map((entity) => FieldQuestionMapper.toDomain(entity));
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    filterOptions,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    filterOptions?: FilterFieldQuestionDto | null;
    sortOptions?: SortFieldQuestionDto[] | null;
  }): Promise<PaginationResponseDto<FieldQuestion>> {
    let order: FindOneOptions<FieldQuestionEntity>['order'] = {
      createdAt: 'DESC',
    };
    if (sortOptions) order = formatOrder(sortOptions);

    let where: FindOptionsWhere<FieldQuestionEntity> = {};
    if (filterOptions?.search)
      where = { ...where, name: Like(`%${filterOptions?.search}%`) };
    if (filterOptions?.type) where = { ...where, type: filterOptions?.type };
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.fieldQuestionRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
      where,
      order,
    });
    const items = entities.map((entity) =>
      FieldQuestionMapper.toDomain(entity),
    );

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'field-questions',
      },
    );
  }

  async findById(
    id: FieldQuestion['id'],
    options?: findOptions,
  ): Promise<NullableType<FieldQuestion>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.fieldQuestionRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? FieldQuestionMapper.toDomain(entity) : null;
  }

  async findAllBySlug(
    slugs: FieldQuestion['slug'][],
    options?: findOptions,
  ): Promise<FieldQuestion[]> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entities = await this.fieldQuestionRepository.find({
      where: { slug: In(slugs) },
      relations,
    });

    return entities.map((entity) => FieldQuestionMapper.toDomain(entity));
  }

  async findBySlug(
    slug: FieldQuestion['slug'],
    options?: findOptions,
  ): Promise<NullableType<FieldQuestion>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.fieldQuestionRepository.findOne({
      where: { slug },
      relations,
    });

    return entity ? FieldQuestionMapper.toDomain(entity) : null;
  }

  async update(
    id: FieldQuestion['id'],
    payload: Partial<FieldQuestion>,
  ): Promise<FieldQuestion> {
    const entity = await this.fieldQuestionRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.fieldQuestionRepository.save(
      this.fieldQuestionRepository.create(
        FieldQuestionMapper.toPersistence({
          ...FieldQuestionMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return FieldQuestionMapper.toDomain(updatedEntity);
  }

  async remove(id: FieldQuestion['id']): Promise<void> {
    await this.fieldQuestionRepository.delete(id);
  }
}
