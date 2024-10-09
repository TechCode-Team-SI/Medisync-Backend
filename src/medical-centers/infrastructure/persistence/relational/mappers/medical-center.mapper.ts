import { MedicalCenter } from '../../../../domain/medical-center';
import { MedicalCenterEntity } from '../entities/medical-center.entity';

export class MedicalCenterMapper {
  static toDomain(raw: MedicalCenterEntity): MedicalCenter {
    const domainEntity = new MedicalCenter();
    domainEntity.instagramName = raw.instagramName;
    domainEntity.twitterName = raw.twitterName;
    domainEntity.facebookName = raw.facebookName;
    domainEntity.tiktokName = raw.tiktokName;
    domainEntity.email = raw.email;
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
    persistenceEntity.instagramName = domainEntity.instagramName;
    persistenceEntity.twitterName = domainEntity.twitterName;
    persistenceEntity.facebookName = domainEntity.facebookName;
    persistenceEntity.tiktokName = domainEntity.tiktokName;
    persistenceEntity.email = domainEntity.email;
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
