import { Injectable, Inject, NotFoundException, Scope } from '@nestjs/common';
import {
  Repository,
  FindOptionsRelations,
  DataSource,
  FindOneOptions,
} from 'typeorm';
import { treatmentEntity } from '../entities/treatment.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { treatment } from '../../../../domain/treatment';
import { treatmentRepository } from '../../treatment.repository';
import { treatmentMapper } from '../mappers/treatment.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/treatments/treatments.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { REQUEST } from '@nestjs/core';
import { formatOrder } from 'src/utils/utils';
import { SorttreatmentsDto } from 'src/treatments/dto/find-all-treatments.dto';

@Injectable({ scope: Scope.REQUEST })
export class treatmentRelationalRepository
  extends BaseRepository
  implements treatmentRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get treatmentRepository(): Repository<treatmentEntity> {
    return this.getRepository(treatmentEntity);
  }

  private relations: FindOptionsRelations<treatmentEntity> = {};

  async create(data: treatment): Promise<treatment> {
    const persistenceModel = treatmentMapper.toPersistence(data);
    const newEntity = await this.treatmentRepository.save(
      this.treatmentRepository.create(persistenceModel),
    );
    return treatmentMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SorttreatmentsDto[] | null;
  }): Promise<PaginationResponseDto<treatment>> {
    let order: FindOneOptions<treatmentEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.treatmentRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
      order,
    });
    const items = entities.map((entity) => treatmentMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'treatments',
      },
    );
  }

  async findById(
    id: treatment['id'],
    options?: findOptions,
  ): Promise<NullableType<treatment>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.treatmentRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? treatmentMapper.toDomain(entity) : null;
  }

  async update(
    id: treatment['id'],
    payload: Partial<treatment>,
  ): Promise<treatment> {
    const entity = await this.treatmentRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.treatmentRepository.save(
      this.treatmentRepository.create(
        treatmentMapper.toPersistence({
          ...treatmentMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return treatmentMapper.toDomain(updatedEntity);
  }

  async remove(id: treatment['id']): Promise<void> {
    await this.treatmentRepository.delete(id);
  }
}
