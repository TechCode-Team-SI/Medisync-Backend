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
import { InjuryEntity } from '../entities/injury.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Injury } from '../../../../domain/injury';
import { InjuryRepository } from '../../injury.repository';
import { InjuryMapper } from '../mappers/injury.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/injuries/injuries.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { REQUEST } from '@nestjs/core';
import { formatOrder } from 'src/utils/utils';
import {
  FilterInjuriesDto,
  SortInjuriesDto,
} from 'src/injuries/dto/find-all-injuries.dto';

@Injectable({ scope: Scope.REQUEST })
export class InjuryRelationalRepository
  extends BaseRepository
  implements InjuryRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get injuryRepository(): Repository<InjuryEntity> {
    return this.getRepository(InjuryEntity);
  }

  private relations: FindOptionsRelations<InjuryEntity> = {};

  async create(data: Injury): Promise<Injury> {
    const persistenceModel = InjuryMapper.toPersistence(data);
    const newEntity = await this.injuryRepository.save(
      this.injuryRepository.create(persistenceModel),
    );
    return InjuryMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortInjuriesDto[] | null;
    filterOptions?: FilterInjuriesDto | null;
  }): Promise<PaginationResponseDto<Injury>> {
    let where: FindOptionsWhere<InjuryEntity> = {};
    if (filterOptions?.search) {
      where = {
        ...where,
        name: Like(`%${filterOptions.search}%`),
      };
    }
    let order: FindOneOptions<InjuryEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.injuryRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
      order,
      where,
    });
    const items = entities.map((entity) => InjuryMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'injuries',
      },
    );
  }

  async findManyByIds(ids: string[], options?: findOptions): Promise<Injury[]> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entities = await this.injuryRepository.find({
      where: { id: In(ids) },
      relations,
    });
    return entities.map((illness) => InjuryMapper.toDomain(illness));
  }

  async findById(
    id: Injury['id'],
    options?: findOptions,
  ): Promise<NullableType<Injury>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.injuryRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? InjuryMapper.toDomain(entity) : null;
  }

  async update(id: Injury['id'], payload: Partial<Injury>): Promise<Injury> {
    const entity = await this.injuryRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.injuryRepository.save(
      this.injuryRepository.create(
        InjuryMapper.toPersistence({
          ...InjuryMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return InjuryMapper.toDomain(updatedEntity);
  }

  async remove(id: Injury['id']): Promise<void> {
    await this.injuryRepository.delete(id);
  }
}
