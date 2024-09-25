import { Injectable, Inject, NotFoundException, Scope } from '@nestjs/common';
import {
  Repository,
  FindOptionsRelations,
  DataSource,
  FindOneOptions,
  In,
} from 'typeorm';
import { IllnessEntity } from '../entities/illness.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Illness } from '../../../../domain/illness';
import { IllnessRepository } from '../../illness.repository';
import { IllnessMapper } from '../mappers/illness.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/illnesses/illnesses.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { REQUEST } from '@nestjs/core';
import { formatOrder } from 'src/utils/utils';
import { SortIllnessesDto } from 'src/illnesses/dto/find-all-illnesses.dto';

@Injectable({ scope: Scope.REQUEST })
export class IllnessRelationalRepository
  extends BaseRepository
  implements IllnessRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get illnessRepository(): Repository<IllnessEntity> {
    return this.getRepository(IllnessEntity);
  }

  private relations: FindOptionsRelations<IllnessEntity> = {};

  async create(data: Illness): Promise<Illness> {
    const persistenceModel = IllnessMapper.toPersistence(data);
    const newEntity = await this.illnessRepository.save(
      this.illnessRepository.create(persistenceModel),
    );
    return IllnessMapper.toDomain(newEntity);
  }

  async findManyByIds(
    ids: string[],
    options?: findOptions,
  ): Promise<Illness[]> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entities = await this.illnessRepository.find({
      where: { id: In(ids) },
      relations,
    });
    return entities.map((illness) => IllnessMapper.toDomain(illness));
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortIllnessesDto[] | null;
  }): Promise<PaginationResponseDto<Illness>> {
    let order: FindOneOptions<IllnessEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.illnessRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
      order,
    });
    const items = entities.map((entity) => IllnessMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'illnesses',
      },
    );
  }

  async findById(
    id: Illness['id'],
    options?: findOptions,
  ): Promise<NullableType<Illness>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.illnessRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? IllnessMapper.toDomain(entity) : null;
  }

  async update(id: Illness['id'], payload: Partial<Illness>): Promise<Illness> {
    const entity = await this.illnessRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.illnessRepository.save(
      this.illnessRepository.create(
        IllnessMapper.toPersistence({
          ...IllnessMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return IllnessMapper.toDomain(updatedEntity);
  }

  async remove(id: Illness['id']): Promise<void> {
    await this.illnessRepository.delete(id);
  }
}
