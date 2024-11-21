---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/repositories/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository.ts
---
import { Injectable, Inject, NotFoundException, Scope } from '@nestjs/common';
import { Repository, FindOptionsRelations, DataSource, FindOneOptions } from 'typeorm';
import { <%= name %>Entity } from '../entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { <%= name %> } from '../../../../domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';
import { <%= name %>Repository } from '../../<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository';
import { <%= name %>Mapper } from '../mappers/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { REQUEST } from '@nestjs/core';
import { formatOrder } from 'src/utils/utils';
import { Sort<%= h.inflection.transform(name, ['pluralize']) %>Dto } from 'src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/find-all-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.dto';

@Injectable({ scope: Scope.REQUEST })
export class <%= name %>RelationalRepository extends BaseRepository implements <%= name %>Repository {
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get <%= h.inflection.camelize(name, true) %>Repository(): Repository<<%= name %>Entity>{
    return this.getRepository(<%= name %>Entity);
  }

  private relations: FindOptionsRelations<<%= name %>Entity> = {};

  async create(data: <%= name %>): Promise<<%= name %>> {
    const persistenceModel = <%= name %>Mapper.toPersistence(data);
    const newEntity = await this.<%= h.inflection.camelize(name, true) %>Repository.save(
      this.<%= h.inflection.camelize(name, true) %>Repository.create(persistenceModel),
    );
    return <%= name %>Mapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: Sort<%= h.inflection.transform(name, ['pluralize']) %>Dto[] | null;
  }): Promise<PaginationResponseDto<<%= name %>>> {
    let order: FindOneOptions<<%= name %>Entity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.<%= h.inflection.camelize(name, true) %>Repository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
      order,
    });
    const items = entities.map((entity) =>
      <%= name %>Mapper.toDomain(entity),
    );

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: '<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>',
      },
    );
  }

  async findById(id: <%= name %>['id'], options?: findOptions): Promise<NullableType<<%= name %>>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.<%= h.inflection.camelize(name, true) %>Repository.findOne({
      where: { id },
      relations,
    });

    return entity ? <%= name %>Mapper.toDomain(entity) : null;
  }

  async update(
    id: <%= name %>['id'],
    payload: Partial<<%= name %>>,
  ): Promise<<%= name %>> {
    const entity = await this.<%= h.inflection.camelize(name, true) %>Repository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.<%= h.inflection.camelize(name, true) %>Repository.save(
      this.<%= h.inflection.camelize(name, true) %>Repository.create(
        <%= name %>Mapper.toPersistence({
          ...<%= name %>Mapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return <%= name %>Mapper.toDomain(updatedEntity);
  }

  async remove(id: <%= name %>['id']): Promise<void> {
    await this.<%= h.inflection.camelize(name, true) %>Repository.delete(id);
  }
}
