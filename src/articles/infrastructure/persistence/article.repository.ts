import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Article } from '../../domain/article';
import { findOptions } from 'src/utils/types/fine-options.type';

export abstract class ArticleRepository {
  abstract create(
    data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Article>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Article>>;

  abstract findById(
    id: Article['id'],
    options?: findOptions,
  ): Promise<NullableType<Article>>;

  abstract update(
    id: Article['id'],
    payload: DeepPartial<Article>,
  ): Promise<Article | null>;

  abstract remove(id: Article['id']): Promise<void>;
}
