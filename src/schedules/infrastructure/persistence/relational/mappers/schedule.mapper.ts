import { EmployeeProfileMapper } from 'src/employee-profiles/infrastructure/persistence/relational/mappers/employee-profile.mapper';
import { Schedule } from '../../../../domain/schedule';
import { ScheduleEntity } from '../entities/schedule.entity';
import { addMinutes, format, parse } from 'date-fns';

export class ScheduleMapper {
  static toDomain(raw: ScheduleEntity): Schedule {
    const domainEntity = new Schedule();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.from = raw.from;
    domainEntity.to = raw.to;
    domainEntity.slotTime = raw.slotTime;
    if (raw.employees) {
      domainEntity.employees = raw.employees.map((employee) =>
        EmployeeProfileMapper.toDomain(employee),
      );
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toDomainSlotted(domain: Schedule): string[] {
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

  static toPersistence(domainEntity: Schedule): ScheduleEntity {
    const persistenceEntity = new ScheduleEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.from = domainEntity.from;
    persistenceEntity.to = domainEntity.to;
    persistenceEntity.slotTime = domainEntity.slotTime;
    if (domainEntity.employees) {
      persistenceEntity.employees = domainEntity.employees.map((employee) =>
        EmployeeProfileMapper.toPersistence(employee),
      );
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
