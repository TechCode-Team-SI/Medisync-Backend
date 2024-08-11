import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';
import { TicketComment } from '../../../../domain/ticket-comment';
import { TicketCommentEntity } from '../entities/ticket-comment.entity';
import { TicketMapper } from 'src/tickets/infrastructure/persistence/relational/mappers/ticket.mapper';

export class TicketCommentMapper {
  static toDomain(raw: TicketCommentEntity): TicketComment {
    const domainEntity = new TicketComment();
    domainEntity.id = raw.id;
    domainEntity.comment = raw.comment;
    if (raw.createdBy) {
      domainEntity.createdBy = UserMapper.toDomain(raw.createdBy);
    }
    if (raw.ticket) {
      domainEntity.ticket = TicketMapper.toDomain(raw.ticket);
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: TicketComment): TicketCommentEntity {
    const persistenceEntity = new TicketCommentEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.comment = domainEntity.comment;
    if (domainEntity.createdBy) {
      persistenceEntity.createdBy = UserMapper.toPersistence(
        domainEntity.createdBy,
      );
    }
    if (domainEntity.ticket) {
      persistenceEntity.ticket = TicketMapper.toPersistence(
        domainEntity.ticket,
      );
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    return persistenceEntity;
  }
}
