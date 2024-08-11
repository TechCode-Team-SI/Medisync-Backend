import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketEntity } from '../entities/ticket.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Ticket } from '../../../../domain/ticket';
import { TicketRepository } from '../../ticket.repository';
import { TicketMapper } from '../mappers/ticket.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/tickets/tickets.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { TicketTypeEnum } from 'src/tickets/tickets.enum';

@Injectable()
export class TicketRelationalRepository implements TicketRepository {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

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
  }: {
    paginationOptions: IPaginationOptions;
    type?: TicketTypeEnum;
  }): Promise<PaginationResponseDto<Ticket>> {
    const where = type ? { type } : {};
    const [entities, count] = await this.ticketRepository.findAndCount({
      where,
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: ['createdBy'],
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

  async findById(id: Ticket['id']): Promise<NullableType<Ticket>> {
    const entity = await this.ticketRepository.findOne({
      where: { id },
      relations: ['createdBy'],
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
