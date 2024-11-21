import { Injectable } from '@nestjs/common';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto';
import { ArticleCategoryRepository } from './infrastructure/persistence/article-category.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ArticleCategory } from './domain/article-category';
import { findOptions } from 'src/utils/types/fine-options.type';
import {
  FilterArticleCategoryDto,
  SortArticleCategoriesDto,
} from 'src/article-categories/dto/find-all-article-categories.dto';

@Injectable()
export class ArticleCategoriesService {
  constructor(
    private readonly articleCategoryRepository: ArticleCategoryRepository,
  ) {}

  create(createArticleCategoryDto: CreateArticleCategoryDto) {
    return this.articleCategoryRepository.create(createArticleCategoryDto);
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortArticleCategoriesDto[] | null;
    filterOptions?: FilterArticleCategoryDto | null;
  }) {
    return this.articleCategoryRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
    });
  }

  findOne(id: ArticleCategory['id'], options?: findOptions) {
    return this.articleCategoryRepository.findById(id, options);
  }

  findMany(ids: ArticleCategory['id'][], options?: findOptions) {
    return this.articleCategoryRepository.findManyByIds(ids, options);
  }

  update(
    id: ArticleCategory['id'],
    updateArticleCategoryDto: UpdateArticleCategoryDto,
  ) {
    return this.articleCategoryRepository.update(id, updateArticleCategoryDto);
  }

  remove(id: ArticleCategory['id']) {
    return this.articleCategoryRepository.remove(id);
  }
}
