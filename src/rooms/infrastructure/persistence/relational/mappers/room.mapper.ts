import { Room } from '../../../../domain/room';
import { RoomEntity } from '../entities/room.entity';
import { SpecialtyMapper } from 'src/specialties/infrastructure/persistence/relational/mappers/specialty.mapper';
import { SpecialtyEntity } from 'src/specialties/infrastructure/persistence/relational/entities/specialty.entity';
import { EmployeeProfileMapper } from 'src/employee-profiles/infrastructure/persistence/relational/mappers/employee-profile.mapper';
import { EmployeeProfileEntity } from 'src/employee-profiles/infrastructure/persistence/relational/entities/employee-profile.entity';

export class RoomMapper {
  static toDomain(raw: RoomEntity): Room {
    const domainEntity = new Room();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.address = raw.address;
    if (raw.specialty) {
      domainEntity.specialty = SpecialtyMapper.toDomain(raw.specialty);
    } else {
      domainEntity.specialty = null;
    }
    if (raw.employeeProfile) {
      domainEntity.employeeProfile = EmployeeProfileMapper.toDomain(
        raw.employeeProfile,
      );
    } else {
      domainEntity.employeeProfile = null;
    }
    domainEntity.isDisabled = raw.isDisabled;
    return domainEntity;
  }

  static toPersistence(domainEntity: Room): RoomEntity {
    let specialty: SpecialtyEntity | undefined | null = undefined;
    if (domainEntity.specialty) {
      specialty = SpecialtyMapper.toPersistence(domainEntity.specialty);
    }

    let employeeProfile: EmployeeProfileEntity | undefined | null = undefined;
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
    persistenceEntity.isDisabled = domainEntity.isDisabled;
    return persistenceEntity;
  }
}
