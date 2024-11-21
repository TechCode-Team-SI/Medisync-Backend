import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ArticleCategory } from '../../domain/article-category';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import {
  FilterArticleCategoryDto,
  SortArticleCategoriesDto,
} from 'src/article-categories/dto/find-all-article-categories.dto';

export abstract class ArticleCategoryRepository extends BaseRepository {
  abstract create(
    data: Omit<ArticleCategory, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ArticleCategory>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortArticleCategoriesDto[] | null;
    filterOptions?: FilterArticleCategoryDto | null;
  }): Promise<PaginationResponseDto<ArticleCategory>>;

  abstract findById(
    id: ArticleCategory['id'],
    options?: findOptions,
  ): Promise<NullableType<ArticleCategory>>;

  abstract findManyByIds(
    ids: ArticleCategory['id'][],
    options?: findOptions,
  ): Promise<ArticleCategory[]>;

  abstract update(
    id: ArticleCategory['id'],
    payload: DeepPartial<ArticleCategory>,
  ): Promise<ArticleCategory | null>;

  abstract remove(id: ArticleCategory['id']): Promise<void>;
}
