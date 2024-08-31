import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Ticket } from './domain/ticket';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { FilterTicketDto, SortTicketDto } from './dto/find-all-tickets.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketRepository } from './infrastructure/persistence/ticket.repository';
import { TicketStatusEnum } from './tickets.enum';
import { exceptionResponses } from './tickets.messages';

@Injectable()
export class TicketsService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(createTicketDto: CreateTicketDto, createdBy: string) {
    const user = await this.usersService.findById(createdBy);

    if (!user) {
      throw new NotFoundException(exceptionResponses.TicketOwnerNotFound);
    }

    const clonedPayload = {
      ...createTicketDto,
      createdBy: user,
    };

    return this.ticketRepository.create(clonedPayload);
  }

  findAllWithPagination({
    paginationOptions,
    filterOptions,
    sortOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    filterOptions?: FilterTicketDto | null;
    sortOptions?: SortTicketDto[] | null;
    options?: findOptions & { createdBy: boolean };
  }) {
    return this.ticketRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      sortOptions,
      filterOptions,
      options,
    });
  }

  findOne(id: Ticket['id']) {
    return this.ticketRepository.findById(id);
  }

  update(id: Ticket['id'], updateTicketDto: UpdateTicketDto) {
    return this.ticketRepository.update(id, updateTicketDto);
  }

  remove(id: Ticket['id']) {
    return this.ticketRepository.remove(id);
  }

  async close(id: Ticket['id']) {
    const ticket = await this.ticketRepository.findById(id);
    if (!ticket) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    if (ticket.status === TicketStatusEnum.CLOSED) {
      throw new UnprocessableEntityException(exceptionResponses.StatusClosed);
    }

    return this.ticketRepository.update(id, {
      status: TicketStatusEnum.CLOSED,
    });
  }
}
