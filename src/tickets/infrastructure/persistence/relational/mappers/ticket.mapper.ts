import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';
import { Ticket } from '../../../../domain/ticket';
import { TicketEntity } from '../entities/ticket.entity';
import { TicketStatusEnum, TicketTypeEnum } from 'src/tickets/tickets.enum';
import { isValueInEnum } from 'src/utils/utils';

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
    if (raw.createdBy) {
      domainEntity.createdBy = UserMapper.toDomain(raw.createdBy);
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
    if (domainEntity.closedAt) {
      persistenceEntity.closedAt = domainEntity.closedAt;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
