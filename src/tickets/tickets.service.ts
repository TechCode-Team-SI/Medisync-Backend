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
import { TicketStatusEnum, TicketTypeEnum } from './tickets.enum';
import { exceptionResponses } from './tickets.messages';
import { TicketTypeRepository } from 'src/ticket-types/infrastructure/persistence/ticket-type.repository';
import { TicketType } from 'src/ticket-types/domain/ticket-type';
import { NotificationsService } from 'src/notifications/notifications.service';
import { MessagesContent } from 'src/notifications/messages.notifications';
import { PermissionsEnum } from 'src/permissions/permissions.enum';

@Injectable()
export class TicketsService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly usersService: UsersService,
    private readonly ticketTypeRepository: TicketTypeRepository,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createTicketDto: CreateTicketDto, createdBy: string) {
    const user = await this.usersService.findById(createdBy);

    if (!user) {
      throw new NotFoundException(exceptionResponses.TicketOwnerNotFound);
    }

    let ticketTag: TicketType | undefined;

    if (createTicketDto.type === TicketTypeEnum.COMPLAINT) {
      if (!createTicketDto.ticketTag) {
        throw new UnprocessableEntityException(
          exceptionResponses.TicketTagNotProvided,
        );
      }
      const ticketType = await this.ticketTypeRepository.findById(
        createTicketDto.ticketTag.id,
      );

      if (!ticketType) {
        throw new NotFoundException(exceptionResponses.TicketTypeNotFound);
      }
      ticketTag = ticketType;
    }

    const clonedPayload = {
      ...createTicketDto,
      createdBy: user,
      ticketTag: ticketTag,
    };
    const ticket = await this.ticketRepository.create(clonedPayload);
    await this.notificationsService.createForUsersByPermission(
      {
        title: MessagesContent.ticket.created.title,
        content: MessagesContent.ticket.created.content(ticket.id),
        type: MessagesContent.ticket.created.type,
      },
      [
        PermissionsEnum.ATTEND_SUGGESTION,
        PermissionsEnum.ATTEND_COMPLAINT,
        PermissionsEnum.VIEW_SUGGESTION,
        PermissionsEnum.VIEW_COMPLAINT,
      ],
    );
    return ticket;
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

  async update(id: Ticket['id'], updateTicketDto: UpdateTicketDto) {
    const ticketUpdate = await this.ticketRepository.update(
      id,
      updateTicketDto,
    );
    await this.notificationsService.createForUsersByPermission(
      {
        title: MessagesContent.ticket.updated.title,
        content: MessagesContent.ticket.updated.content(id),
        type: MessagesContent.ticket.updated.type,
      },
      [
        PermissionsEnum.ATTEND_SUGGESTION,
        PermissionsEnum.ATTEND_COMPLAINT,
        PermissionsEnum.VIEW_SUGGESTION,
        PermissionsEnum.VIEW_COMPLAINT,
      ],
    );
    return ticketUpdate;
  }

  async remove(id: Ticket['id']) {
    const ticketRemove = await this.ticketRepository.remove(id);
    await this.notificationsService.createForUsersByPermission(
      {
        title: MessagesContent.ticket.remove.title,
        content: MessagesContent.ticket.remove.content(id),
        type: MessagesContent.ticket.remove.type,
      },
      [
        PermissionsEnum.ATTEND_SUGGESTION,
        PermissionsEnum.ATTEND_COMPLAINT,
        PermissionsEnum.VIEW_SUGGESTION,
        PermissionsEnum.VIEW_COMPLAINT,
      ],
    );
    return ticketRemove;
  }

  async close(id: Ticket['id']) {
    const ticket = await this.ticketRepository.findById(id);
    if (!ticket) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    if (ticket.status === TicketStatusEnum.CLOSED) {
      throw new UnprocessableEntityException(exceptionResponses.StatusClosed);
    }
    await this.notificationsService.createForUsersByPermission(
      {
        title: MessagesContent.ticket.closed.title,
        content: MessagesContent.ticket.closed.content(id),
        type: MessagesContent.ticket.closed.type,
      },
      [
        PermissionsEnum.ATTEND_SUGGESTION,
        PermissionsEnum.ATTEND_COMPLAINT,
        PermissionsEnum.VIEW_SUGGESTION,
        PermissionsEnum.VIEW_COMPLAINT,
      ],
    );
    return this.ticketRepository.update(id, {
      status: TicketStatusEnum.CLOSED,
    });
  }
}
