import { Treatment } from '../../../../domain/treatment';
import { TreatmentEntity } from '../entities/treatment.entity';

export class TreatmentMapper {
  static toDomain(raw: TreatmentEntity): Treatment {
    const domainEntity = new Treatment();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Treatment): TreatmentEntity {
    const persistenceEntity = new TreatmentEntity();
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
