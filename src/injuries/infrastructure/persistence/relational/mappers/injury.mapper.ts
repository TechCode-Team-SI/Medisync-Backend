import { Injury } from '../../../../domain/injury';
import { InjuryEntity } from '../entities/injury.entity';

export class InjuryMapper {
  static toDomain(raw: InjuryEntity): Injury {
    const domainEntity = new Injury();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Injury): InjuryEntity {
    const persistenceEntity = new InjuryEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
