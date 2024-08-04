import { PasswordToken } from '../../../../domain/password-token';
import { PasswordTokenEntity } from '../entities/password-token.entity';

export class PasswordTokenMapper {
  static toDomain(raw: PasswordTokenEntity): PasswordToken {
    const domainEntity = new PasswordToken();
    domainEntity.id = raw.id;
    domainEntity.email = raw.email;
    domainEntity.code = raw.code;
    domainEntity.expiresAt = raw.expiresAt;
    domainEntity.createdAt = raw.createdAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: PasswordToken): PasswordTokenEntity {
    const persistenceEntity = new PasswordTokenEntity();
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
