import { MedicalCenter } from '../../../../domain/medical-center';
import { MedicalCenterEntity } from '../entities/medical-center.entity';

export class MedicalCenterMapper {
  static toDomain(raw: MedicalCenterEntity): MedicalCenter {
    const domainEntity = new MedicalCenter();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.address = raw.address;
    domainEntity.state = raw.state;
    domainEntity.municipality = raw.municipality;
    domainEntity.parish = raw.parish;
    domainEntity.localPhone = raw.localPhone;
    domainEntity.mobilePhone = raw.mobilePhone;
    domainEntity.mission = raw.mission;
    domainEntity.vision = raw.vision;

    return domainEntity;
  }

  static toPersistence(domainEntity: MedicalCenter): MedicalCenterEntity {
    const persistenceEntity = new MedicalCenterEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.address = domainEntity.address;
    persistenceEntity.state = domainEntity.state;
    persistenceEntity.municipality = domainEntity.municipality;
    persistenceEntity.parish = domainEntity.parish;
    persistenceEntity.localPhone = domainEntity.localPhone;
    persistenceEntity.mobilePhone = domainEntity.mobilePhone;
    persistenceEntity.mission = domainEntity.mission;
    persistenceEntity.vision = domainEntity.vision;

    return persistenceEntity;
  }
}
