import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';
import { Ticket } from '../../../../domain/ticket';
import { TicketEntity } from '../entities/ticket.entity';
import { TicketStatusEnum, TicketTypeEnum } from 'src/tickets/tickets.enum';
import { isValueInEnum } from 'src/utils/utils';
import { TicketCommentMapper } from 'src/ticket-comments/infrastructure/persistence/relational/mappers/ticket-comment.mapper';
import { TicketTypeMapper } from 'src/ticket-types/infrastructure/persistence/relational/mappers/ticket-type.mapper';

export class TicketMapper {
  static toDomain(raw: TicketEntity): Ticket {
    const domainEntity = new Ticket();
    domainEntity.id = raw.id;
    domainEntity.title = raw.title;
    domainEntity.description = raw.description;
    if (isValueInEnum(TicketTypeEnum, raw.type)) {
      domainEntity.type = raw.type as TicketTypeEnum;
    }
    if (isValueInEnum(TicketStatusEnum, raw.status)) {
      domainEntity.status = raw.status as TicketStatusEnum;
    }
    domainEntity.comments = [];
    if (raw.comments) {
      domainEntity.comments = raw.comments.map((comment) =>
        TicketCommentMapper.toDomain(comment),
      );
    }
    if (raw.createdBy) {
      domainEntity.createdBy = UserMapper.toDomain(raw.createdBy);
    }
    if (raw.ticketTag) {
      domainEntity.ticketTag = TicketTypeMapper.toDomain(raw.ticketTag);
    }
    domainEntity.closedAt = raw.closedAt;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Ticket): TicketEntity {
    const persistenceEntity = new TicketEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.type = domainEntity.type;
    persistenceEntity.status = domainEntity.status;
    if (domainEntity.createdBy) {
      persistenceEntity.createdBy = UserMapper.toPersistence(
        domainEntity.createdBy,
      );
    }
    if (domainEntity.ticketTag) {
      persistenceEntity.ticketTag = TicketTypeMapper.toPersistence(
        domainEntity.ticketTag,
      );
    }
    if (domainEntity.closedAt) {
      persistenceEntity.closedAt = domainEntity.closedAt;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
