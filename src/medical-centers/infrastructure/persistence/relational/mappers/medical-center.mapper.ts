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
    domainEntity.local_phone = raw.local_phone;
    domainEntity.mobile_phone = raw.mobile_phone;
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
    persistenceEntity.local_phone = domainEntity.local_phone;
    persistenceEntity.mobile_phone = domainEntity.mobile_phone;
    persistenceEntity.mission = domainEntity.mission;
    persistenceEntity.vision = domainEntity.vision;

    return persistenceEntity;
  }
}
