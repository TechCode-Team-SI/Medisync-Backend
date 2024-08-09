import { SpecialtyMapper } from 'src/specialties/infrastructure/persistence/relational/mappers/specialty.mapper';
import { EmployeeProfile } from '../../../../domain/employee-profile';
import { EmployeeProfileEntity } from '../entities/employee-profile.entity';

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

    return persistenceEntity;
  }
}
