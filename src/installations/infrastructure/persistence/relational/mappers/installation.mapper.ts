import { Installation } from '../../../../domain/installation';
import { InstallationEntity } from '../entities/installation.entity';

export class InstallationMapper {
  static toDomain(raw: InstallationEntity): Installation {
    const domainEntity = new Installation();
    domainEntity.id = raw.id;
    domainEntity.step = raw.step;

    return domainEntity;
  }

  static toPersistence(domainEntity: Installation): InstallationEntity {
    const persistenceEntity = new InstallationEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.step = domainEntity.step;

    return persistenceEntity;
  }
}
