import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request as ExpressRequest } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { RequestFormatted } from 'src/requests/domain/request-formatted';
import {
  FilterRequestDto,
  SortRequestDto,
} from 'src/requests/dto/find-all-requests.dto';
import { exceptionResponses } from 'src/requests/requests.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { formatOrder } from 'src/utils/utils';
import {
  Between,
  DataSource,
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Request } from '../../../../domain/request';
import { RequestRepository } from '../../request.repository';
import { RequestEntity } from '../entities/request.entity';
import { RequestMapper } from '../mappers/request.mapper';

@Injectable({ scope: Scope.REQUEST })
export class RequestRelationalRepository
  extends BaseRepository
  implements RequestRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: ExpressRequest,
  ) {
    super(datasource, request);
  }

  private get requestRepository(): Repository<RequestEntity> {
    return this.getRepository(RequestEntity);
  }

  private relations: FindOptionsRelations<RequestEntity> = {
    requestValues: {
      fieldQuestion: {
        selectionConfig: true,
      },
      selections: true,
    },
    requestedSpecialty: true,
    requestedMedic: true,
    rating: true,
    madeFor: true,
    requestTemplate: {
      fields: {
        fieldQuestion: {
          selectionConfig: true,
          selections: true,
        },
      },
    },
  };

  async create(data: Request): Promise<Request> {
    const persistenceModel = RequestMapper.toPersistence(data);
    const newEntity = await this.requestRepository.save(
      this.requestRepository.create(persistenceModel),
    );
    return RequestMapper.toDomain(newEntity);
  }

  async findAllMinimalWithPagination({
    paginationOptions,
    filterOptions,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    sortOptions?: SortRequestDto[] | null;
    filterOptions?: FilterRequestDto | null;
  }): Promise<PaginationResponseDto<Request>> {
    let order: FindOneOptions<RequestEntity>['order'] = { createdAt: 'DESC' };
    if (sortOptions) order = formatOrder(sortOptions);

    let where: FindOptionsWhere<RequestEntity> = {};
    if (filterOptions?.madeByIds) {
      where = {
        ...where,
        madeBy: { id: In(filterOptions.madeByIds) },
      };
    }
    if (filterOptions?.madeForIds) {
      where = {
        ...where,
        madeFor: { id: In(filterOptions.madeForIds) },
      };
    }
    if (filterOptions?.savedToIds) {
      where = {
        ...where,
        savedTo: { id: In(filterOptions.savedToIds) },
      };
    }
    if (filterOptions?.requestTemplateIds) {
      where = {
        ...where,
        requestTemplate: { id: In(filterOptions.requestTemplateIds) },
      };
    }
    if (filterOptions?.requestedMedicIds) {
      where = {
        ...where,
        requestedMedic: {
          id: In(filterOptions.requestedMedicIds),
        },
      };
    }
    if (filterOptions?.status) {
      const status = Array.isArray(filterOptions.status)
        ? filterOptions.status
        : [filterOptions.status];
      where = { ...where, status: In(status) };
    }
    if (filterOptions?.search) {
      where = {
        ...where,
        patientFullName: Like(`%${filterOptions.search}%`),
      };
    }
    if (filterOptions?.from && filterOptions?.to) {
      where = {
        ...where,
        appointmentDate: Between(filterOptions.from, filterOptions.to),
      };
    } else if (filterOptions?.from) {
      where = {
        ...where,
        appointmentDate: MoreThanOrEqual(filterOptions.from),
      };
    } else if (filterOptions?.to) {
      where = {
        ...where,
        appointmentDate: LessThanOrEqual(filterOptions.to),
      };
    }

    const [entities, count] = await this.requestRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where,
      order,
      relations: {
        rating: true,
        madeFor: true,
        requestedSpecialty: true,
        requestedMedic: true,
      },
    });
    const items = entities.map((entity) => RequestMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'requests',
      },
    );
  }

  async findById(
    id: Request['id'],
    options?: findOptions & {
      withSpecialty?: boolean;
      withMedic?: boolean;
      withMadeBy?: boolean;
    },
  ): Promise<NullableType<Request>> {
    let relations = this.relations;
    if (options) relations = {};
    if (options?.withSpecialty) {
      relations = {
        ...relations,
        requestedSpecialty: true,
      };
    }
    if (options?.withMedic) {
      relations = {
        ...relations,
        requestedMedic: true,
      };
    }
    if (options?.withMadeBy) {
      relations = { ...relations, madeFor: true };
    }
    if (options?.minimal) relations = {};

    const entity = await this.requestRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? RequestMapper.toDomain(entity) : null;
  }

  async findRating(id: Request['id']): Promise<NullableType<Request>> {
    let relations = this.relations;
    relations = { rating: true };

    const entity = await this.requestRepository.findOne({
      where: { id },
      relations,
    });

    return entity?.rating ? RequestMapper.toDomain(entity) : null;
  }

  async findByIdFormatted(
    id: Request['id'],
  ): Promise<NullableType<RequestFormatted>> {
    const relations = this.relations;

    const entity = await this.requestRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? RequestMapper.toFormatted(entity) : null;
  }

  async update(id: Request['id'], payload: Partial<Request>): Promise<Request> {
    const entity = await this.requestRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.requestRepository.save(
      this.requestRepository.create(
        RequestMapper.toPersistence({
          ...RequestMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RequestMapper.toDomain(updatedEntity);
  }

  async remove(id: Request['id']): Promise<void> {
    await this.requestRepository.delete(id);
  }
}
