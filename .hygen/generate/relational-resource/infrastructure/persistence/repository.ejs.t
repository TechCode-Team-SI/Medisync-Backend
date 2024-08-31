---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository.ts
---
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { <%= name %> } from '../../domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import { Sort<%= h.inflection.transform(name, ['pluralize']) %>Dto } from 'src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/find-all-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.dto';

export abstract class <%= name %>Repository extends BaseRepository {
  abstract create(
    data: Omit<<%= name %>, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<<%= name %>>;

  abstract findAllWithPagination({
    paginationOptions,
    options
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: Sort<%= h.inflection.transform(name, ['pluralize']) %>Dto[] | null;
  }): Promise<PaginationResponseDto<<%= name %>>>;

  abstract findById(id: <%= name %>['id'], options?: findOptions): Promise<NullableType<<%= name %>>>;

  abstract update(
    id: <%= name %>['id'],
    payload: DeepPartial<<%= name %>>,
  ): Promise<<%= name %> | null>;

  abstract remove(id: <%= name %>['id']): Promise<void>;
}
