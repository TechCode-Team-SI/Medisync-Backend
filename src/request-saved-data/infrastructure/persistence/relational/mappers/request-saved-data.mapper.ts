import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';
import { RequestSavedData } from '../../../../domain/request-saved-data';
import { RequestSavedDataEntity } from '../entities/request-saved-data.entity';
import { RequestMapper } from 'src/requests/infrastructure/persistence/relational/mappers/request.mapper';

export class RequestSavedDataMapper {
  static toDomain(raw: RequestSavedDataEntity): RequestSavedData {
    const domainEntity = new RequestSavedData();
    domainEntity.id = raw.id;
    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }
    if (raw.request) {
      domainEntity.request = RequestMapper.toDomain(raw.request);
    }
    domainEntity.alias = raw.alias;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: RequestSavedData): RequestSavedDataEntity {
    const persistenceEntity = new RequestSavedDataEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    }
    if (domainEntity.request) {
      persistenceEntity.request = RequestMapper.toPersistence(
        domainEntity.request,
      );
    }
    persistenceEntity.alias = domainEntity.alias;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
