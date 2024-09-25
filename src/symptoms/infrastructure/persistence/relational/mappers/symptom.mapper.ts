import { Symptom } from '../../../../domain/symptom';
import { SymptomEntity } from '../entities/symptom.entity';

export class SymptomMapper {
  static toDomain(raw: SymptomEntity): Symptom {
    const domainEntity = new Symptom();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Symptom): SymptomEntity {
    const persistenceEntity = new SymptomEntity();
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
