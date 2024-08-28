import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { TicketTypeEnum } from 'src/tickets/tickets.enum';
import { exceptionResponses } from 'src/tickets/tickets.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { DataSource, FindOptionsRelations, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Ticket } from '../../../../domain/ticket';
import { TicketRepository } from '../../ticket.repository';
import { TicketEntity } from '../entities/ticket.entity';
import { TicketMapper } from '../mappers/ticket.mapper';

@Injectable({ scope: Scope.REQUEST })
export class TicketRelationalRepository
  extends BaseRepository
  implements TicketRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get ticketRepository(): Repository<TicketEntity> {
    return this.getRepository(TicketEntity);
  }

  private relations: FindOptionsRelations<TicketEntity> = { createdBy: true };

  async create(data: Ticket): Promise<Ticket> {
    const persistenceModel = TicketMapper.toPersistence(data);
    const newEntity = await this.ticketRepository.save(
      this.ticketRepository.create(persistenceModel),
    );
    return TicketMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    type,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    type?: TicketTypeEnum;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Ticket>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const where = type ? { type } : {};
    const [entities, count] = await this.ticketRepository.findAndCount({
      where,
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
    });
    const items = entities.map((entity) => TicketMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'tickets',
      },
    );
  }

  async findById(
    id: Ticket['id'],
    options?: findOptions,
  ): Promise<NullableType<Ticket>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.ticketRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? TicketMapper.toDomain(entity) : null;
  }

  async update(id: Ticket['id'], payload: Partial<Ticket>): Promise<Ticket> {
    const entity = await this.ticketRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.ticketRepository.save(
      this.ticketRepository.create(
        TicketMapper.toPersistence({
          ...TicketMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TicketMapper.toDomain(updatedEntity);
  }

  async remove(id: Ticket['id']): Promise<void> {
    await this.ticketRepository.delete(id);
  }
}
