import { DaysOffMapper } from 'src/days-offs/infrastructure/persistence/relational/mappers/days-off.mapper';
import { Agenda } from '../../../../domain/agenda';
import { AgendaEntity } from '../entities/agenda.entity';
import { addMinutes, format, parse } from 'date-fns';

export class AgendaMapper {
  static toDomain(raw: AgendaEntity): Agenda {
    const domainEntity = new Agenda();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.from = raw.from;
    domainEntity.to = raw.to;
    domainEntity.slotTime = raw.slotTime;
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
    persistenceEntity.from = domainEntity.from;
    persistenceEntity.to = domainEntity.to;
    persistenceEntity.slotTime = domainEntity.slotTime;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    if (domainEntity.daysOffs) {
      persistenceEntity.daysOffs = domainEntity.daysOffs.map((dayOff) =>
        DaysOffMapper.toPersistence(dayOff),
      );
    }

    return persistenceEntity;
  }

  static toDomainSlotted(domain: Agenda): string[] {
    const slotTime = domain.slotTime;
    let start = parse(domain.from, 'HH:mm', new Date());
    const end = parse(domain.to, 'HH:mm', new Date());
    const lastAdmittedSlot = addMinutes(end, -slotTime);
    const slots: string[] = [];
    while (start <= lastAdmittedSlot) {
      slots.push(format(start, 'HH:mm'));
      start = addMinutes(start, slotTime);
    }

    return slots;
  }
}
