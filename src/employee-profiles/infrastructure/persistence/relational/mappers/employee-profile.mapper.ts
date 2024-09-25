import { SpecialtyMapper } from 'src/specialties/infrastructure/persistence/relational/mappers/specialty.mapper';
import { AgendaMapper } from 'src/agendas/infrastructure/persistence/relational/mappers/agenda.mapper';
import { EmployeeProfileEntity } from '../entities/employee-profile.entity';
import { EmployeeProfile } from 'src/employee-profiles/domain/employee-profile';

export class EmployeeProfileMapper {
  static toDomain(raw: EmployeeProfileEntity): EmployeeProfile {
    const domainEntity = new EmployeeProfile();
    domainEntity.id = raw.id;
    domainEntity.address = raw.address;
    domainEntity.birthday = raw.birthday;
    domainEntity.dni = raw.dni;
    if (raw.specialties) {
      domainEntity.specialties = raw.specialties.map((specialty) =>
        SpecialtyMapper.toDomain(specialty),
      );
    }
    if (raw.agenda) {
      domainEntity.agenda = AgendaMapper.toDomain(raw.agenda);
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: EmployeeProfile): EmployeeProfileEntity {
    const persistenceEntity = new EmployeeProfileEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.address = domainEntity.address;
    persistenceEntity.birthday = domainEntity.birthday;
    persistenceEntity.dni = domainEntity.dni;
    if (domainEntity.specialties) {
      persistenceEntity.specialties = domainEntity.specialties.map(
        (specialty) => SpecialtyMapper.toPersistence(specialty),
      );
    }
    if (domainEntity.agenda) {
      persistenceEntity.agenda = AgendaMapper.toPersistence(
        domainEntity.agenda,
      );
    }

    return persistenceEntity;
  }
}
