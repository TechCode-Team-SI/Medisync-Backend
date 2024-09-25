import { Injectable, Inject, NotFoundException, Scope } from '@nestjs/common';
import {
  Repository,
  FindOptionsRelations,
  DataSource,
  FindOneOptions,
} from 'typeorm';
import { AgendaEntity } from '../entities/agenda.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Agenda } from '../../../../domain/agenda';
import { AgendaRepository } from '../../agenda.repository';
import { AgendaMapper } from '../mappers/agenda.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/agendas/agendas.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { REQUEST } from '@nestjs/core';
import { formatOrder } from 'src/utils/utils';
import { SortAgendasDto } from 'src/agendas/dto/find-all-agendas.dto';

@Injectable({ scope: Scope.REQUEST })
export class AgendaRelationalRepository
  extends BaseRepository
  implements AgendaRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get agendaRepository(): Repository<AgendaEntity> {
    return this.getRepository(AgendaEntity);
  }

  private relations: FindOptionsRelations<AgendaEntity> = {};

  async create(data: Agenda): Promise<Agenda> {
    const persistenceModel = AgendaMapper.toPersistence(data);
    const newEntity = await this.agendaRepository.save(
      this.agendaRepository.create(persistenceModel),
    );
    return AgendaMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortAgendasDto[] | null;
  }): Promise<PaginationResponseDto<Agenda>> {
    let order: FindOneOptions<AgendaEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.agendaRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
      order,
    });
    const items = entities.map((entity) => AgendaMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'agendas',
      },
    );
  }

  async findById(
    id: Agenda['id'],
    options?: findOptions,
  ): Promise<NullableType<Agenda>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.agendaRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? AgendaMapper.toDomain(entity) : null;
  }

  async update(id: Agenda['id'], payload: Partial<Agenda>): Promise<Agenda> {
    const entity = await this.agendaRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.agendaRepository.save(
      this.agendaRepository.create(
        AgendaMapper.toPersistence({
          ...AgendaMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return AgendaMapper.toDomain(updatedEntity);
  }

  async remove(id: Agenda['id']): Promise<void> {
    await this.agendaRepository.delete(id);
  }
}
