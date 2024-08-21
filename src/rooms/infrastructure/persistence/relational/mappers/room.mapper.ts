import { Room } from '../../../../domain/room';
import { RoomEntity } from '../entities/room.entity';
import { SpecialtyMapper } from 'src/specialties/infrastructure/persistence/relational/mappers/specialty.mapper';
import { SpecialtyEntity } from 'src/specialties/infrastructure/persistence/relational/entities/specialty.entity';
import { EmployeeProfileMapper } from 'src/users/infrastructure/persistence/relational/mappers/employee-profile.mapper';
import { EmployeeProfileEntity } from 'src/users/infrastructure/persistence/relational/entities/employee-profile.entity';

export class RoomMapper {
  static toDomain(raw: RoomEntity): Room {
    const domainEntity = new Room();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.address = raw.address;
    if (raw.specialty) {
      domainEntity.specialty = SpecialtyMapper.toDomain(raw.specialty);
    }
    if (raw.employeeProfile) {
      domainEntity.employeeProfile = EmployeeProfileMapper.toDomain(
        raw.employeeProfile,
      );
    }
    return domainEntity;
  }

  static toPersistence(domainEntity: Room): RoomEntity {
    let specialty: SpecialtyEntity | undefined = undefined;
    if (domainEntity.specialty) {
      specialty = SpecialtyMapper.toPersistence(domainEntity.specialty);
    }

    let employeeProfile: EmployeeProfileEntity | undefined = undefined;
    if (domainEntity.employeeProfile) {
      employeeProfile = EmployeeProfileMapper.toPersistence(
        domainEntity.employeeProfile,
      );
    }

    const persistenceEntity = new RoomEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.address = domainEntity.address;
    persistenceEntity.specialty = specialty;
    persistenceEntity.employeeProfile = employeeProfile;

    return persistenceEntity;
  }
}
