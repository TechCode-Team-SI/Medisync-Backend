import { TicketMapper } from 'src/tickets/infrastructure/persistence/relational/mappers/ticket.mapper';
import { TicketType } from '../../../../domain/ticket-type';
import { TicketTypeEntity } from '../entities/ticket-type.entity';

export class TicketTypeMapper {
  static toDomain(raw: TicketTypeEntity): TicketType {
    const domainEntity = new TicketType();
    domainEntity.id = raw.id;
    domainEntity.slug = raw.slug;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    if (raw.tickets) {
      domainEntity.tickets = raw.tickets.map((ticket) =>
        TicketMapper.toDomain(ticket),
      );
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: TicketType): TicketTypeEntity {
    const persistenceEntity = new TicketTypeEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.slug = domainEntity.slug;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
