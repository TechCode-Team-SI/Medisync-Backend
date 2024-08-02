---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository.ts
---
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { <%= name %> } from '../../domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';

export abstract class <%= name %>Repository {
  abstract create(
    data: Omit<<%= name %>, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<<%= name %>>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationResponseDto<<%= name %>>>;

  abstract findById(id: <%= name %>['id']): Promise<NullableType<<%= name %>>>;

  abstract update(
    id: <%= name %>['id'],
    payload: DeepPartial<<%= name %>>,
  ): Promise<<%= name %> | null>;

  abstract remove(id: <%= name %>['id']): Promise<void>;
}
