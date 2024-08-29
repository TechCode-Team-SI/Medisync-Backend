import { RequestMapper } from 'src/requests/infrastructure/persistence/relational/mappers/request.mapper';
import { Rating } from '../../../../domain/rating';
import { RatingEntity } from '../entities/rating.entity';
import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';

export class RatingMapper {
  static toDomain(raw: RatingEntity): Rating {
    const domainEntity = new Rating();

    domainEntity.id = raw.id;
    domainEntity.stars = raw.stars;
    if (raw.ratedBy) {
      domainEntity.ratedBy = UserMapper.toDomain(raw.ratedBy);
    }
    if (raw.request) {
      domainEntity.request = RequestMapper.toDomain(raw.request);
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: Rating): RatingEntity {
    const persistenceEntity = new RatingEntity();

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.stars = domainEntity.stars;
    if (domainEntity.ratedBy) {
      persistenceEntity.ratedBy = UserMapper.toPersistence(
        domainEntity.ratedBy,
      );
    }
    if (domainEntity.request) {
      persistenceEntity.request = RequestMapper.toPersistence(
        domainEntity.request,
      );
    }

    return persistenceEntity;
  }
}
