import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsRelations, DataSource } from 'typeorm';
import { RatingEntity } from '../entities/rating.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Rating } from '../../../../domain/rating';
import { RatingRepository } from '../../rating.repository';
import { RatingMapper } from '../mappers/rating.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/ratings/ratings.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class RatingRelationalRepository
  extends BaseRepository
  implements RatingRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get ratingRepository(): Repository<RatingEntity> {
    return this.getRepository(RatingEntity);
  }

  private relations: FindOptionsRelations<RatingEntity> = {};

  async create(data: Rating): Promise<Rating> {
    const persistenceModel = RatingMapper.toPersistence(data);
    const newEntity = await this.ratingRepository.save(
      this.ratingRepository.create(persistenceModel),
    );
    return RatingMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Rating>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.ratingRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
    });
    const items = entities.map((entity) => RatingMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'ratings',
      },
    );
  }

  async findById(
    id: Rating['id'],
    options?: findOptions,
  ): Promise<NullableType<Rating>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.ratingRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? RatingMapper.toDomain(entity) : null;
  }

  async update(id: Rating['id'], payload: Partial<Rating>): Promise<Rating> {
    const entity = await this.ratingRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.ratingRepository.save(
      this.ratingRepository.create(
        RatingMapper.toPersistence({
          ...RatingMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RatingMapper.toDomain(updatedEntity);
  }

  async remove(id: Rating['id']): Promise<void> {
    await this.ratingRepository.delete(id);
  }
}
