import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { exceptionResponses } from 'src/request-templates/request-templates.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
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
import { RequestTemplate } from '../../../../domain/request-template';
import { RequestTemplateRepository } from '../../request-template.repository';
import { RequestTemplateEntity } from '../entities/request-template.entity';
import { RequestTemplateMapper } from '../mappers/request-template.mapper';
import {
  FilterRequestTemplateDto,
  SortRequestTemplateDto,
} from 'src/request-templates/dto/find-all-request-templates.dto';
import { formatOrder } from 'src/utils/utils';

@Injectable({ scope: Scope.REQUEST })
export class RequestTemplateRelationalRepository
  extends BaseRepository
  implements RequestTemplateRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get requestTemplateRepository(): Repository<RequestTemplateEntity> {
    return this.getRepository(RequestTemplateEntity);
  }

  private relations: FindOptionsRelations<RequestTemplateEntity> = {
    fields: {
      fieldQuestion: {
        selectionConfig: true,
        selections: true,
      },
    },
  };

  async create(data: RequestTemplate): Promise<RequestTemplate> {
    const persistenceModel = RequestTemplateMapper.toPersistence(data);
    const newEntity = await this.requestTemplateRepository.save(
      this.requestTemplateRepository.create(persistenceModel),
    );
    return RequestTemplateMapper.toDomain(newEntity);
  }

  async createMultiple(data: RequestTemplate[]): Promise<RequestTemplate[]> {
    const persistenceModels = data.map((template) =>
      RequestTemplateMapper.toPersistence(template),
    );
    const newEntities = await this.requestTemplateRepository.save(
      this.requestTemplateRepository.create(persistenceModels),
    );
    return newEntities.map((newEntity) =>
      RequestTemplateMapper.toDomain(newEntity),
    );
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortRequestTemplateDto[] | null;
    filterOptions?: FilterRequestTemplateDto | null;
  }): Promise<PaginationResponseDto<RequestTemplate>> {
    let where: FindOptionsWhere<RequestTemplateEntity> = {};
    if (filterOptions?.search) {
      where = {
        name: Like(`%${filterOptions.search}%`),
      };
    }
    let order: FindOneOptions<RequestTemplateEntity>['order'] = {
      createdAt: 'DESC',
    };
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.requestTemplateRepository.findAndCount(
      {
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        relations,
        order,
        where,
      },
    );
    const items = entities.map((entity) =>
      RequestTemplateMapper.toDomain(entity),
    );

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'request-templates',
      },
    );
  }

  async findById(
    id: RequestTemplate['id'],
    options?: findOptions,
  ): Promise<NullableType<RequestTemplate>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.requestTemplateRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? RequestTemplateMapper.toDomain(entity) : null;
  }

  async findBySpecialtyId(
    specialtyId: string,
    options?: findOptions,
  ): Promise<NullableType<RequestTemplate>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.requestTemplateRepository.findOne({
      where: { specialties: { id: specialtyId } },
      relations,
    });

    return entity ? RequestTemplateMapper.toDomain(entity) : null;
  }

  async findBySlug(
    slug: RequestTemplate['slug'],
    options?: findOptions,
  ): Promise<NullableType<RequestTemplate>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.requestTemplateRepository.findOne({
      where: { slug },
      relations,
    });

    return entity ? RequestTemplateMapper.toDomain(entity) : null;
  }

  async findAllBySlug(
    slugs: RequestTemplate['slug'][],
    options?: findOptions,
  ): Promise<RequestTemplate[]> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entities = await this.requestTemplateRepository.find({
      where: { slug: In(slugs) },
      relations,
    });

    return entities.map((entity) => RequestTemplateMapper.toDomain(entity));
  }

  async update(
    id: RequestTemplate['id'],
    payload: Partial<RequestTemplate>,
  ): Promise<RequestTemplate> {
    const entity = await this.requestTemplateRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.requestTemplateRepository.save(
      this.requestTemplateRepository.create(
        RequestTemplateMapper.toPersistence({
          ...RequestTemplateMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RequestTemplateMapper.toDomain(updatedEntity);
  }

  async remove(id: RequestTemplate['id']): Promise<void> {
    await this.requestTemplateRepository.delete(id);
  }
}
