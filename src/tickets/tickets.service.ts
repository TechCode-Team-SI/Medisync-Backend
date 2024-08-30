import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketRepository } from './infrastructure/persistence/ticket.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Ticket } from './domain/ticket';
import { UsersService } from 'src/users/users.service';
import { TicketStatusEnum, TicketTypeEnum } from './tickets.enum';
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
    type,
    createdById,
  }: {
    paginationOptions: IPaginationOptions;
    type?: TicketTypeEnum;
    createdById?: string;
  }) {
    return this.ticketRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      type,
      createdById,
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
