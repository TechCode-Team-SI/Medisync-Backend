import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { exceptionResponses } from 'src/articles/articles.messages';
import { BaseRepository } from 'src/common/base.repository';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import {
  DataSource,
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Like,
  Repository,
} from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Article } from '../../../../domain/article';
import { ArticleRepository } from '../../article.repository';
import { ArticleEntity } from '../entities/article.entity';
import { ArticleMapper } from '../mappers/article.mapper';
import {
  FilterArticleDto,
  SortArticleDto,
} from 'src/articles/dto/find-all-articles.dto';
import { formatOrder } from 'src/utils/utils';

@Injectable({ scope: Scope.REQUEST })
export class ArticleRelationalRepository
  extends BaseRepository
  implements ArticleRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get articleRepository(): Repository<ArticleEntity> {
    return this.getRepository(ArticleEntity);
  }

  private relations: FindOptionsRelations<ArticleEntity> = { updatedBy: true };

  async create(data: Article): Promise<Article> {
    const persistenceModel = ArticleMapper.toPersistence(data);
    const newEntity = await this.articleRepository.save(
      this.articleRepository.create(persistenceModel),
    );
    return ArticleMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortArticleDto[] | null;
    filterOptions?: FilterArticleDto | null;
  }): Promise<PaginationResponseDto<Article>> {
    let where: FindOptionsWhere<ArticleEntity> = {};
    if (filterOptions?.search) {
      where = {
        ...where,
        title: Like(`%${filterOptions.search}%`),
      };
    }
    let order: FindOneOptions<ArticleEntity>['order'] = { createdAt: 'DESC' };
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.articleRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
      order,
      where,
    });
    const items = entities.map((entity) => ArticleMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'articles',
      },
    );
  }

  async findById(
    id: Article['id'],
    options?: findOptions,
  ): Promise<NullableType<Article>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.articleRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async update(id: Article['id'], payload: Partial<Article>): Promise<Article> {
    const entity = await this.articleRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.articleRepository.save(
      this.articleRepository.create(
        ArticleMapper.toPersistence({
          ...ArticleMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ArticleMapper.toDomain(updatedEntity);
  }

  async remove(id: Article['id']): Promise<void> {
    await this.articleRepository.delete(id);
  }
}
