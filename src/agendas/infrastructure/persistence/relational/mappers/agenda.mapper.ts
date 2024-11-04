import { DaysOffMapper } from 'src/days-offs/infrastructure/persistence/relational/mappers/days-off.mapper';
import { Agenda } from '../../../../domain/agenda';
import { AgendaEntity } from '../entities/agenda.entity';

export class AgendaMapper {
  static toDomain(raw: AgendaEntity): Agenda {
    const domainEntity = new Agenda();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    if (raw.weekdays) {
      domainEntity.weekdays = raw.weekdays.split('_');
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    if (raw.daysOffs) {
      domainEntity.daysOffs = raw.daysOffs.map((dayOff) =>
        DaysOffMapper.toDomain(dayOff),
      );
    }
    return domainEntity;
  }

  static toPersistence(domainEntity: Agenda): AgendaEntity {
    const persistenceEntity = new AgendaEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    if (domainEntity.weekdays) {
      persistenceEntity.weekdays = domainEntity.weekdays.join('_');
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    if (domainEntity.daysOffs) {
      persistenceEntity.daysOffs = domainEntity.daysOffs.map((dayOff) =>
        DaysOffMapper.toPersistence(dayOff),
      );
    }

    return persistenceEntity;
  }
}
