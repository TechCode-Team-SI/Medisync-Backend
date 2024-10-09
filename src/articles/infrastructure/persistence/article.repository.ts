import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Article } from '../../domain/article';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import {
  FilterArticleDto,
  SortArticleDto,
} from 'src/articles/dto/find-all-articles.dto';

export abstract class ArticleRepository extends BaseRepository {
  abstract create(
    data: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Article>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortArticleDto[] | null;
    filterOptions?: FilterArticleDto | null;
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
