import { PermissionMapper } from 'src/permissions/infrastructure/persistence/relational/mappers/permission.mapper';
import { Role } from '../../../../domain/role';
import { RoleEntity } from '../entities/role.entity';

export class RoleMapper {
  static toDomain(raw: RoleEntity): Role {
    const domainEntity = new Role();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    if (raw.permissions) {
      domainEntity.permissions = raw.permissions.map((permission) =>
        PermissionMapper.toDomain(permission),
      );
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Role): RoleEntity {
    const persistenceEntity = new RoleEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    if (domainEntity.permissions) {
      persistenceEntity.permissions = domainEntity.permissions.map(
        (permission) => PermissionMapper.toPersistence(permission),
      );
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
