import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';
import { UserPatient } from '../../../../domain/user-patient';
import { UserPatientEntity } from '../entities/user-patient.entity';

export class UserPatientMapper {
  static toDomain(raw: UserPatientEntity): UserPatient {
    const domainEntity = new UserPatient();
    domainEntity.id = raw.id;
    domainEntity.fullName = raw.fullName;
    domainEntity.dni = raw.dni;
    domainEntity.gender = raw.gender;
    domainEntity.birthday = raw.birthday;
    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: UserPatient): UserPatientEntity {
    const persistenceEntity = new UserPatientEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.fullName = domainEntity.fullName;
    persistenceEntity.dni = domainEntity.dni;
    persistenceEntity.birthday = domainEntity.birthday;
    persistenceEntity.gender = domainEntity.gender;
    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
