---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service.ts
---
import { Injectable } from '@nestjs/common';
import { Create<%= name %>Dto } from './dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
import { Update<%= name %>Dto } from './dto/update-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
import { <%= name %>Repository } from './infrastructure/persistence/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { <%= name %> } from './domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Sort<%= h.inflection.transform(name, ['pluralize']) %>Dto } from 'src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/find-all-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.dto';

@Injectable()
export class <%= h.inflection.transform(name, ['pluralize']) %>Service {
  constructor(private readonly <%= h.inflection.camelize(name, true) %>Repository: <%= name %>Repository) {}

  create(create<%= name %>Dto: Create<%= name %>Dto) {
    return this.<%= h.inflection.camelize(name, true) %>Repository.create(create<%= name %>Dto);
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: Sort<%= h.inflection.transform(name, ['pluralize']) %>Dto[] | null;
  }) {
    return this.<%= h.inflection.camelize(name, true) %>Repository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
    });
  }

  findOne(id: <%= name %>['id'], options?: findOptions) {
    return this.<%= h.inflection.camelize(name, true) %>Repository.findById(id, options);
  }

  update(id: <%= name %>['id'], update<%= name %>Dto: Update<%= name %>Dto) {
    return this.<%= h.inflection.camelize(name, true) %>Repository.update(id, update<%= name %>Dto);
  }

  remove(id: <%= name %>['id']) {
    return this.<%= h.inflection.camelize(name, true) %>Repository.remove(id);
  }
}
