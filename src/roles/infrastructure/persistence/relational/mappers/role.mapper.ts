import { PermissionMapper } from 'src/permissions/infrastructure/persistence/relational/mappers/permission.mapper';
import { Role } from '../../../../domain/role';
import { RoleEntity } from '../entities/role.entity';
import { isRoleMutable } from 'src/utils/utils';

export class RoleMapper {
  static toDomain(raw: RoleEntity): Role {
    const domainEntity = new Role();
    domainEntity.slug = raw.slug;
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    if (raw.permissions) {
      domainEntity.permissions = raw.permissions.map((permission) =>
        PermissionMapper.toDomain(permission),
      );
    }
    domainEntity.isMutable = isRoleMutable(raw.slug);
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Role): RoleEntity {
    const persistenceEntity = new RoleEntity();
    persistenceEntity.slug = domainEntity.slug;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    if (domainEntity.permissions) {
      persistenceEntity.permissions = domainEntity.permissions.map(
        (permission) => PermissionMapper.toPersistence(permission),
      );
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
