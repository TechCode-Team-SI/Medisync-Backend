import { RoleMapper } from 'src/roles/infrastructure/persistence/relational/mappers/role.mapper';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { FileMapper } from '../../../../../files/infrastructure/persistence/relational/mappers/file.mapper';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { User } from '../../../../domain/user';
import { UserEntity } from '../entities/user.entity';
import { EmployeeProfileMapper } from 'src/employee-profiles/infrastructure/persistence/relational/mappers/employee-profile.mapper';
import { EmployeeProfileEntity } from '../../../../../employee-profiles/infrastructure/persistence/relational/entities/employee-profile.entity';
import { UserPatientMapper } from 'src/user-patients/infrastructure/persistence/relational/mappers/user-patient.mapper';
import { UserPatientEntity } from 'src/user-patients/infrastructure/persistence/relational/entities/user-patient.entity';

export class UserMapper {
  static toDomain(raw: UserEntity): User {
    const domainEntity = new User();
    domainEntity.phone = raw.phone;
    domainEntity.id = raw.id;
    domainEntity.email = raw.email;
    domainEntity.password = raw.password;
    domainEntity.fullName = raw.fullName;
    if (raw.photo) {
      domainEntity.photo = FileMapper.toDomain(raw.photo);
    }
    if (raw.roles) {
      domainEntity.roles = raw.roles.map((role) => RoleMapper.toDomain(role));
    }
    if (raw.employeeProfile) {
      domainEntity.employeeProfile = EmployeeProfileMapper.toDomain(
        raw.employeeProfile,
      );
    }
    if (raw.userPatients && raw.userPatients.length > 0) {
      domainEntity.userPatients = raw.userPatients.map((userPatient) => {
        return UserPatientMapper.toDomain(userPatient);
      });
    }
    domainEntity.phone = raw.phone;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: User): UserEntity {
    let roles: RoleEntity[] | undefined = undefined;

    if (domainEntity.roles) {
      roles = domainEntity.roles.map((role) => {
        return RoleMapper.toPersistence(role);
      });
    }

    let photo: FileEntity | undefined | null = undefined;

    if (domainEntity.photo) {
      photo = new FileEntity();
      photo.id = domainEntity.photo.id;
      photo.path = domainEntity.photo.path;
    } else if (domainEntity.photo === null) {
      photo = null;
    }

    let employeeProfile: EmployeeProfileEntity | undefined = undefined;

    if (domainEntity.employeeProfile) {
      employeeProfile = EmployeeProfileMapper.toPersistence(
        domainEntity.employeeProfile,
      );
    }

    let userPatients: UserPatientEntity[] | undefined = undefined;
    if (domainEntity.userPatients) {
      userPatients = domainEntity.userPatients.map((userPatient) => {
        return UserPatientMapper.toPersistence(userPatient);
      });
    }

    const persistenceEntity = new UserEntity();
    if (domainEntity.phone) {
      persistenceEntity.phone = domainEntity.phone;
    }
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.email = domainEntity.email;
    persistenceEntity.password = domainEntity.password;
    persistenceEntity.fullName = domainEntity.fullName;
    persistenceEntity.photo = photo;
    persistenceEntity.roles = roles;
    persistenceEntity.employeeProfile = employeeProfile;
    persistenceEntity.userPatients = userPatients;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.deletedAt = domainEntity.deletedAt;
    return persistenceEntity;
  }
}
