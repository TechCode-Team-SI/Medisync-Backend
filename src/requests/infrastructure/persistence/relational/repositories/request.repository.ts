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
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import {
  Brackets,
  DataSource,
  FindOptionsRelations,
  Repository,
} from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Request } from '../../../../domain/request';
import { RequestRepository } from '../../request.repository';
import { RequestEntity } from '../entities/request.entity';
import { RequestMapper } from '../mappers/request.mapper';
import { RequestStatusEnum } from 'src/requests/requests.enum';

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
    filterOptions?: (FilterRequestDto & { includeGroup?: boolean }) | null;
  }): Promise<PaginationResponseDto<Request>> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.requestedMedic', 'requestedMedic')
      .leftJoinAndSelect('r.requestedSpecialty', 'requestedSpecialty')
      .leftJoinAndSelect('r.madeFor', 'madeFor')
      .leftJoinAndSelect('r.requestTemplate', 'requestTemplate')
      .leftJoinAndSelect('r.savedTo', 'savedTo')
      .leftJoinAndSelect('r.rating', 'rating')
      .where('1 = 1');

    if (filterOptions?.madeByIds) {
      query.andWhere('r.madeById IN (:...madeByIds)', {
        madeByIds: filterOptions.madeByIds,
      });
    }
    if (filterOptions?.madeForIds) {
      query.andWhere('r.madeForId IN (:...madeForIds)', {
        madeForIds: filterOptions.madeForIds,
      });
    }
    if (filterOptions?.savedToIds) {
      query.andWhere('r.savedToId IN (:...savedToIds)', {
        savedToIds: filterOptions.savedToIds,
      });
    }
    if (filterOptions?.requestTemplateIds) {
      query.andWhere('r.requestTemplateId IN (:...requestTemplateIds)', {
        requestTemplateIds: filterOptions.requestTemplateIds,
      });
    }
    if (filterOptions?.status) {
      const status = Array.isArray(filterOptions.status)
        ? filterOptions.status
        : [filterOptions.status];
      query.andWhere('r.status IN (:...status)', {
        status: status,
      });
    }
    if (filterOptions?.search) {
      query.andWhere("r.patientFullName LIKE '%:search%'", {
        search: filterOptions.search,
      });
    }
    if (filterOptions?.from && filterOptions?.to) {
      query.andWhere('r.appointmentDate BETWEEN :from AND :to', {
        from: filterOptions.from,
        to: filterOptions.to,
      });
    } else if (filterOptions?.from) {
      query.andWhere('r.appointmentDate >= :from', {
        from: filterOptions.from,
      });
    } else if (filterOptions?.to) {
      query.andWhere('r.appointmentDate <= :to', {
        to: filterOptions.to,
      });
    }
    if (filterOptions?.requestedMedicIds) {
      if (filterOptions.includeGroup) {
        const specialties = await entityManager
          .getRepository(UserEntity)
          .createQueryBuilder('u')
          .innerJoin('u.employeeProfile', 'e')
          .innerJoin('e.specialties', 'specialties')
          .where('u.id IN (:...requestedMedicIds)', {
            requestedMedicIds: filterOptions.requestedMedicIds,
          })
          .andWhere('specialties.isGroup IS TRUE')
          .select('specialties.id', 'id')
          .getRawMany();

        query.andWhere(
          new Brackets((qb) => {
            qb.where('r.requestedMedicId IN (:...requestedMedicIds)', {
              requestedMedicIds: filterOptions.requestedMedicIds,
            });
            if (specialties.length > 0) {
              qb.orWhere('r.requestedSpecialtyId IN (:...specialties)', {
                specialties: specialties.map((s) => s.id),
              });
            }
          }),
        );
      } else {
        query.andWhere('r.requestedMedicId IN (:...requestedMedicIds)', {
          requestedMedicIds: filterOptions.requestedMedicIds,
        });
      }
    }
    if (sortOptions && sortOptions.length > 0) {
      const { order, orderBy } = sortOptions[0];
      query.orderBy(`r.${orderBy}`, order as 'ASC' | 'DESC');
    } else {
      query.orderBy('r.createdAt', 'DESC');
    }

    query
      .limit(paginationOptions.limit)
      .offset((paginationOptions.page - 1) * paginationOptions.limit);

    const [entities, count] = await query.getManyAndCount();
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
      relations = { ...relations, madeBy: true };
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

  async updateStatusBySpecialty(
    specialtyId: string,
    status: RequestStatusEnum,
  ): Promise<void> {
    await this.requestRepository
      .createQueryBuilder()
      .update()
      .set({ status })
      .where('requestedSpecialtyId = :specialtyId', { specialtyId })
      .execute();
  }
}
