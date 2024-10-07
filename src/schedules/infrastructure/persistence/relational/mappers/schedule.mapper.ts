import { EmployeeProfileMapper } from 'src/employee-profiles/infrastructure/persistence/relational/mappers/employee-profile.mapper';
import { Schedule } from '../../../../domain/schedule';
import { ScheduleEntity } from '../entities/schedule.entity';

export class ScheduleMapper {
  static toDomain(raw: ScheduleEntity): Schedule {
    const domainEntity = new Schedule();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.from = raw.from;
    domainEntity.to = raw.to;
    if (raw.employees) {
      domainEntity.employees = raw.employees.map((employee) =>
        EmployeeProfileMapper.toDomain(employee),
      );
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Schedule): ScheduleEntity {
    const persistenceEntity = new ScheduleEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.from = domainEntity.from;
    persistenceEntity.to = domainEntity.to;
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
