import { ConfirmEmailToken } from '../../../../domain/confirm-email-token';
import { ConfirmEmailTokenEntity } from '../entities/confirm-email-token.entity';

export class ConfirmEmailTokenMapper {
  static toDomain(raw: ConfirmEmailTokenEntity): ConfirmEmailToken {
    const domainEntity = new ConfirmEmailToken();
    domainEntity.id = raw.id;
    domainEntity.email = raw.email;
    domainEntity.code = raw.code;
    domainEntity.expiresAt = raw.expiresAt;
    domainEntity.createdAt = raw.createdAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: ConfirmEmailToken,
  ): ConfirmEmailTokenEntity {
    const persistenceEntity = new ConfirmEmailTokenEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.email = domainEntity.email;
    persistenceEntity.code = domainEntity.code;
    persistenceEntity.expiresAt = domainEntity.expiresAt;
    persistenceEntity.createdAt = domainEntity.createdAt;

    return persistenceEntity;
  }
}
