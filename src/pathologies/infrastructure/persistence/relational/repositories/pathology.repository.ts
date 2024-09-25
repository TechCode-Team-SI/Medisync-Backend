import { Injectable, Inject, NotFoundException, Scope } from '@nestjs/common';
import {
  Repository,
  FindOptionsRelations,
  DataSource,
  FindOneOptions,
} from 'typeorm';
import { PathologyEntity } from '../entities/pathology.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Pathology } from '../../../../domain/pathology';
import { PathologyRepository } from '../../pathology.repository';
import { PathologyMapper } from '../mappers/pathology.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/pathologies/pathologies.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { REQUEST } from '@nestjs/core';
import { formatOrder } from 'src/utils/utils';
import { SortPathologiesDto } from 'src/pathologies/dto/find-all-pathologies.dto';

@Injectable({ scope: Scope.REQUEST })
export class PathologyRelationalRepository
  extends BaseRepository
  implements PathologyRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get pathologyRepository(): Repository<PathologyEntity> {
    return this.getRepository(PathologyEntity);
  }

  private relations: FindOptionsRelations<PathologyEntity> = {};

  async create(data: Pathology): Promise<Pathology> {
    const persistenceModel = PathologyMapper.toPersistence(data);
    const newEntity = await this.pathologyRepository.save(
      this.pathologyRepository.create(persistenceModel),
    );
    return PathologyMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortPathologiesDto[] | null;
  }): Promise<PaginationResponseDto<Pathology>> {
    let order: FindOneOptions<PathologyEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.pathologyRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
      order,
    });
    const items = entities.map((entity) => PathologyMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'pathologies',
      },
    );
  }

  async findById(
    id: Pathology['id'],
    options?: findOptions,
  ): Promise<NullableType<Pathology>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.pathologyRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? PathologyMapper.toDomain(entity) : null;
  }

  async update(
    id: Pathology['id'],
    payload: Partial<Pathology>,
  ): Promise<Pathology> {
    const entity = await this.pathologyRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.pathologyRepository.save(
      this.pathologyRepository.create(
        PathologyMapper.toPersistence({
          ...PathologyMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PathologyMapper.toDomain(updatedEntity);
  }

  async remove(id: Pathology['id']): Promise<void> {
    await this.pathologyRepository.delete(id);
  }
}
