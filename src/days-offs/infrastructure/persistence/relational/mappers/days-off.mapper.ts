import { AgendaMapper } from 'src/agendas/infrastructure/persistence/relational/mappers/agenda.mapper';
import { DaysOff } from '../../../../domain/days-off';
import { DaysOffEntity } from '../entities/days-off.entity';
import { EmployeeProfileMapper } from 'src/employee-profiles/infrastructure/persistence/relational/mappers/employee-profile.mapper';
import { SpecialtyMapper } from 'src/specialties/infrastructure/persistence/relational/mappers/specialty.mapper';

export class DaysOffMapper {
  static toDomain(raw: DaysOffEntity): DaysOff {
    const domainEntity = new DaysOff();
    domainEntity.id = raw.id;
    domainEntity.from = raw.from;
    domainEntity.to = raw.to;
    if (domainEntity.agenda) {
      domainEntity.agenda = AgendaMapper.toDomain(raw.agenda);
    }
    if (domainEntity.employeeProfile) {
      domainEntity.employeeProfile = EmployeeProfileMapper.toDomain(
        raw.employeeProfile,
      );
    }
    if (domainEntity.specialty) {
      domainEntity.specialty = SpecialtyMapper.toDomain(raw.specialty);
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: DaysOff): DaysOffEntity {
    const persistenceEntity = new DaysOffEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.from = domainEntity.from;
    persistenceEntity.to = domainEntity.to;
    if (domainEntity.agenda) {
      persistenceEntity.agenda = AgendaMapper.toPersistence(
        domainEntity.agenda,
      );
    }
    if (domainEntity.employeeProfile) {
      persistenceEntity.employeeProfile = EmployeeProfileMapper.toPersistence(
        domainEntity.employeeProfile,
      );
    }
    if (domainEntity.specialty) {
      persistenceEntity.specialty = SpecialtyMapper.toPersistence(
        domainEntity.specialty,
      );
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
