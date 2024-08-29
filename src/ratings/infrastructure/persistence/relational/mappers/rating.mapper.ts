import { RequestMapper } from 'src/requests/infrastructure/persistence/relational/mappers/request.mapper';
import { Rating } from '../../../../domain/rating';
import { RatingEntity } from '../entities/rating.entity';
import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';

export class RatingMapper {
  static toDomain(raw: RatingEntity): Rating {
    const domainEntity = new Rating();

    domainEntity.id = raw.id;
    domainEntity.stars = raw.stars;
    if (raw.ratingBy) {
      domainEntity.ratingBy = UserMapper.toDomain(raw.ratingBy);
    }
    if (raw.requestId) {
      domainEntity.requestId = RequestMapper.toDomain(raw.requestId);
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: Rating): RatingEntity {
    const persistenceEntity = new RatingEntity();

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.stars = domainEntity.stars;
    if (domainEntity.ratingBy) {
      persistenceEntity.ratingBy = UserMapper.toPersistence(
        domainEntity.ratingBy,
      );
    }
    if (domainEntity.requestId) {
      persistenceEntity.requestId = RequestMapper.toPersistence(
        domainEntity.requestId,
      );
    }

    return persistenceEntity;
  }
}
