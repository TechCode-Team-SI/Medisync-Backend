import { InjectQueue } from '@nestjs/bullmq';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Queue } from 'bullmq';
import { MessagesContent } from 'src/notifications/messages.notifications';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
import { TicketType } from 'src/ticket-types/domain/ticket-type';
import { TicketTypeRepository } from 'src/ticket-types/infrastructure/persistence/ticket-type.repository';
import { UsersService } from 'src/users/users.service';
import { NotificationQueueOperations, QueueName } from 'src/utils/queue-enum';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Ticket } from './domain/ticket';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { FilterTicketDto, SortTicketDto } from './dto/find-all-tickets.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketRepository } from './infrastructure/persistence/ticket.repository';
import { TicketStatusEnum, TicketTypeEnum } from './tickets.enum';
import { exceptionResponses } from './tickets.messages';
import { NotificationTypeEnum } from 'src/notifications/notifications.enum';

@Injectable()
export class TicketsService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly usersService: UsersService,
    private readonly ticketTypeRepository: TicketTypeRepository,
    @InjectQueue(QueueName.NOTIFICATION) private notificationQueue: Queue,
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
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.ticket.created.title,
          content: MessagesContent.ticket.created.content(ticket.id),
          type: MessagesContent.ticket.created.type,
        },
        permissions: [
          PermissionsEnum.ATTEND_SUGGESTION,
          PermissionsEnum.ATTEND_COMPLAINT,
          PermissionsEnum.VIEW_SUGGESTION,
          PermissionsEnum.VIEW_COMPLAINT,
        ],
      },
    );

    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_INDIVIDUALS,
      {
        payload: {
          title: MessagesContent.ticket.created.title,
          content: `${MessagesContent.ticket.created.content(ticket.id)}, llevaremos un seguimiento de su ticket.`,
          type: NotificationTypeEnum.PATIENT,
        },
        userIds: [user.id],
      },
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
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.ticket.updated.title,
          content: MessagesContent.ticket.updated.content(id),
          type: MessagesContent.ticket.updated.type,
        },
        permissions: [
          PermissionsEnum.ATTEND_SUGGESTION,
          PermissionsEnum.ATTEND_COMPLAINT,
          PermissionsEnum.VIEW_SUGGESTION,
          PermissionsEnum.VIEW_COMPLAINT,
        ],
      },
    );
    return ticketUpdate;
  }

  async remove(id: Ticket['id']) {
    const ticketRemove = await this.ticketRepository.remove(id);
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.ticket.remove.title,
          content: MessagesContent.ticket.remove.content(id),
          type: MessagesContent.ticket.remove.type,
        },
        permissions: [
          PermissionsEnum.ATTEND_SUGGESTION,
          PermissionsEnum.ATTEND_COMPLAINT,
          PermissionsEnum.VIEW_SUGGESTION,
          PermissionsEnum.VIEW_COMPLAINT,
        ],
      },
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
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.ticket.closed.title,
          content: MessagesContent.ticket.closed.content(id),
          type: MessagesContent.ticket.closed.type,
        },
        permissions: [
          PermissionsEnum.ATTEND_SUGGESTION,
          PermissionsEnum.ATTEND_COMPLAINT,
          PermissionsEnum.VIEW_SUGGESTION,
          PermissionsEnum.VIEW_COMPLAINT,
        ],
      },
    );

    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_INDIVIDUALS,
      {
        payload: {
          title: MessagesContent.ticket.closed.title,
          content: `${MessagesContent.ticket.closed.content(ticket.id)}, gracias por su tiempo.`,
          type: NotificationTypeEnum.PATIENT,
        },
        userIds: [ticket.createdBy.id],
      },
    );

    return this.ticketRepository.update(id, {
      status: TicketStatusEnum.CLOSED,
    });
  }
}
