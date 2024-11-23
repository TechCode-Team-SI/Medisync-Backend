import { TopGenericEntity } from '../entities/top-generic.entity';
import { TopGeneric } from '../../../../domain/top-generic';

export class TopGenericMapper {
  static toDomain(raw: TopGenericEntity): TopGeneric {
    const domainEntity = new TopGeneric();
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.requests = Number(raw.requests);

    return domainEntity;
  }
}
