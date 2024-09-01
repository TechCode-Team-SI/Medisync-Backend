import { Injectable, Inject, NotFoundException, Scope } from '@nestjs/common';
import {
  Repository,
  FindOptionsRelations,
  DataSource,
  FindOneOptions,
  FindOptionsWhere,
  In,
} from 'typeorm';
import { RequestSavedDataEntity } from '../entities/request-saved-data.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { RequestSavedData } from '../../../../domain/request-saved-data';
import { RequestSavedDataRepository } from '../../request-saved-data.repository';
import { RequestSavedDataMapper } from '../mappers/request-saved-data.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/request-saved-data/request-saved-data.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { REQUEST } from '@nestjs/core';
import { formatOrder } from 'src/utils/utils';
import {
  FilterRequestSavedDataDto,
  SortRequestSavedDataDto,
} from 'src/request-saved-data/dto/find-all-request-saved-data.dto';

@Injectable({ scope: Scope.REQUEST })
export class RequestSavedDataRelationalRepository
  extends BaseRepository
  implements RequestSavedDataRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get requestSavedDataRepository(): Repository<RequestSavedDataEntity> {
    return this.getRepository(RequestSavedDataEntity);
  }

  private relations: FindOptionsRelations<RequestSavedDataEntity> = {};

  async create(data: RequestSavedData): Promise<RequestSavedData> {
    const persistenceModel = RequestSavedDataMapper.toPersistence(data);
    const newEntity = await this.requestSavedDataRepository.save(
      this.requestSavedDataRepository.create(persistenceModel),
    );
    return RequestSavedDataMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortRequestSavedDataDto[] | null;
    filterOptions?: FilterRequestSavedDataDto | null;
  }): Promise<PaginationResponseDto<RequestSavedData>> {
    let where: FindOptionsWhere<RequestSavedDataEntity> = {};
    if (filterOptions?.requestTemplateId) {
      where = {
        ...where,
        request: { requestTemplate: { id: filterOptions?.requestTemplateId } },
      };
    }
    if (filterOptions?.userIds) {
      where = { ...where, user: { id: In(filterOptions.userIds) } };
    }

    let order: FindOneOptions<RequestSavedDataEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] =
      await this.requestSavedDataRepository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        relations,
        where,
        order,
      });
    const items = entities.map((entity) =>
      RequestSavedDataMapper.toDomain(entity),
    );

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'request-saved-data',
      },
    );
  }

  async findById(
    id: RequestSavedData['id'],
    options?: findOptions,
  ): Promise<NullableType<RequestSavedData>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.requestSavedDataRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? RequestSavedDataMapper.toDomain(entity) : null;
  }

  async update(
    id: RequestSavedData['id'],
    payload: Partial<RequestSavedData>,
  ): Promise<RequestSavedData> {
    const entity = await this.requestSavedDataRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.requestSavedDataRepository.save(
      this.requestSavedDataRepository.create(
        RequestSavedDataMapper.toPersistence({
          ...RequestSavedDataMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RequestSavedDataMapper.toDomain(updatedEntity);
  }

  async remove(id: RequestSavedData['id']): Promise<void> {
    await this.requestSavedDataRepository.delete(id);
  }
}
