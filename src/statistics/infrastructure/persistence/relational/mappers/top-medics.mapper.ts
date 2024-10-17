import { TopMedics } from '../../../../domain/top-medics';
import { TopMedicsEntity } from '../entities/top-medics.entity';

export class TopMedicsMapper {
  static toDomain(raw: TopMedicsEntity): TopMedics {
    const domainEntity = new TopMedics();
    domainEntity.medicId = raw.medicId;
    domainEntity.fullName = raw.fullName;
    domainEntity.avatar = raw.avatar;
    domainEntity.requests = Number(raw.requests);

    return domainEntity;
  }
}
