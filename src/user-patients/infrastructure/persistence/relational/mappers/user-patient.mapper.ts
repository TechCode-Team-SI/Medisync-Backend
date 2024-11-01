import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';
import { UserPatient } from '../../../../domain/user-patient';
import { UserPatientEntity } from '../entities/user-patient.entity';
import { RequestMapper } from 'src/requests/infrastructure/persistence/relational/mappers/request.mapper';

export class UserPatientMapper {
  static toDomain(raw: UserPatientEntity): UserPatient {
    const domainEntity = new UserPatient();
    domainEntity.id = raw.id;
    domainEntity.fullName = raw.fullName;
    domainEntity.dni = raw.dni;
    domainEntity.gender = raw.gender;
    domainEntity.birthday = raw.birthday;
    domainEntity.address = raw.address;
    domainEntity.familyRelationship = raw.familyRelationship;
    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }
    if (raw.savedRequests) {
      domainEntity.savedRequests = raw.savedRequests.map((request) =>
        RequestMapper.toDomain(request),
      );
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
    if (domainEntity.address) {
      persistenceEntity.address = domainEntity.address;
    }
    persistenceEntity.familyRelationship = domainEntity.familyRelationship;
    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    }
    if (domainEntity.savedRequests) {
      persistenceEntity.savedRequests = domainEntity.savedRequests.map(
        (request) => RequestMapper.toPersistence(request),
      );
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
