import { EmployeeProfile } from '../../../../domain/employee-profile';
import { EmployeeProfileEntity } from '../entities/employee-profile.entity';

export class EmployeeProfileMapper {
  static toDomain(raw: EmployeeProfileEntity): EmployeeProfile {
    const domainEntity = new EmployeeProfile();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: EmployeeProfile): EmployeeProfileEntity {
    const persistenceEntity = new EmployeeProfileEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
