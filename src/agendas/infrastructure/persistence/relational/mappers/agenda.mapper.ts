import { Agenda } from '../../../../domain/agenda';
import { AgendaEntity } from '../entities/agenda.entity';

export class AgendaMapper {
  static toDomain(raw: AgendaEntity): Agenda {
    const domainEntity = new Agenda();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.weekdays = raw.weekdays.split('_');
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Agenda): AgendaEntity {
    const persistenceEntity = new AgendaEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.weekdays = domainEntity.weekdays.join('_');
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
