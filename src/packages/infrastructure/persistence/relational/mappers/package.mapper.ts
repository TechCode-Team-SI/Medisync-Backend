import { Package } from '../../../../domain/package';
import { PackageEntity } from '../entities/package.entity';

export class PackageMapper {
  static toDomain(raw: PackageEntity): Package {
    const domainEntity = new Package();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.slug = raw.slug;
    domainEntity.applied = raw.applied;
    domainEntity.description = raw.description;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Package): PackageEntity {
    const persistenceEntity = new PackageEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.slug = domainEntity.slug;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.applied = domainEntity.applied;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
