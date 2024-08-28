import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { findOptions } from 'src/utils/types/fine-options.type';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { RequestTemplate } from '../../domain/request-template';

export abstract class RequestTemplateRepository {
  abstract create(
    data: Omit<RequestTemplate, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<RequestTemplate>;

  abstract createMultiple(
    data: Omit<RequestTemplate, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<RequestTemplate[]>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<RequestTemplate>>;

  abstract findById(
    id: RequestTemplate['id'],
    options?: findOptions,
  ): Promise<NullableType<RequestTemplate>>;

  abstract findBySlug(
    slug: RequestTemplate['slug'],
    options?: findOptions,
  ): Promise<NullableType<RequestTemplate>>;

  abstract findAllBySlug(
    slugs: RequestTemplate['slug'][],
    options?: findOptions,
  ): Promise<RequestTemplate[]>;

  abstract update(
    id: RequestTemplate['id'],
    payload: DeepPartial<RequestTemplate>,
  ): Promise<RequestTemplate | null>;

  abstract remove(id: RequestTemplate['id']): Promise<void>;
}
