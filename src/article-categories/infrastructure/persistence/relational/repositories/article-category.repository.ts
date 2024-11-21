import { Injectable, Inject, NotFoundException, Scope } from '@nestjs/common';
import {
  Repository,
  FindOptionsRelations,
  DataSource,
  FindOneOptions,
  In,
  FindOptionsWhere,
  Like,
} from 'typeorm';
import { ArticleCategoryEntity } from '../entities/article-category.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ArticleCategory } from '../../../../domain/article-category';
import { ArticleCategoryRepository } from '../../article-category.repository';
import { ArticleCategoryMapper } from '../mappers/article-category.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/article-categories/article-categories.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { REQUEST } from '@nestjs/core';
import { formatOrder } from 'src/utils/utils';
import {
  FilterArticleCategoryDto,
  SortArticleCategoriesDto,
} from 'src/article-categories/dto/find-all-article-categories.dto';

@Injectable({ scope: Scope.REQUEST })
export class ArticleCategoryRelationalRepository
  extends BaseRepository
  implements ArticleCategoryRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get articleCategoryRepository(): Repository<ArticleCategoryEntity> {
    return this.getRepository(ArticleCategoryEntity);
  }

  private relations: FindOptionsRelations<ArticleCategoryEntity> = {};

  async create(data: ArticleCategory): Promise<ArticleCategory> {
    const persistenceModel = ArticleCategoryMapper.toPersistence(data);
    const newEntity = await this.articleCategoryRepository.save(
      this.articleCategoryRepository.create(persistenceModel),
    );
    return ArticleCategoryMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortArticleCategoriesDto[] | null;
    filterOptions?: FilterArticleCategoryDto | null;
  }): Promise<PaginationResponseDto<ArticleCategory>> {
    let order: FindOneOptions<ArticleCategoryEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    let where: FindOptionsWhere<ArticleCategoryEntity> = {};
    if (filterOptions?.search) {
      where = { name: Like(`%${filterOptions.search}%`) };
    }

    const [entities, count] = await this.articleCategoryRepository.findAndCount(
      {
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        where,
        relations,
        order,
      },
    );
    const items = entities.map((entity) =>
      ArticleCategoryMapper.toDomain(entity),
    );

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'article-categories',
      },
    );
  }

  async findById(
    id: ArticleCategory['id'],
    options?: findOptions,
  ): Promise<NullableType<ArticleCategory>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.articleCategoryRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? ArticleCategoryMapper.toDomain(entity) : null;
  }

  async findManyByIds(
    ids: string[],
    options?: findOptions,
  ): Promise<ArticleCategory[]> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entities = await this.articleCategoryRepository.find({
      where: { id: In(ids) },
      relations,
    });
    return entities.map((category) => ArticleCategoryMapper.toDomain(category));
  }

  async update(
    id: ArticleCategory['id'],
    payload: Partial<ArticleCategory>,
  ): Promise<ArticleCategory> {
    const entity = await this.articleCategoryRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.articleCategoryRepository.save(
      this.articleCategoryRepository.create(
        ArticleCategoryMapper.toPersistence({
          ...ArticleCategoryMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ArticleCategoryMapper.toDomain(updatedEntity);
  }

  async remove(id: ArticleCategory['id']): Promise<void> {
    await this.articleCategoryRepository.delete(id);
  }
}
