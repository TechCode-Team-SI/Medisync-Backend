import { NotificationMapper } from 'src/notifications/infrastructure/persistence/relational/mappers/notification.mapper';
import { NotificationUser } from '../../../../domain/notification-user';
import { NotificationUserEntity } from '../entities/notification-user.entity';
import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';

export class NotificationUserMapper {
  static toDomain(raw: NotificationUserEntity): NotificationUser {
    const domainEntity = new NotificationUser();
    domainEntity.id = raw.id;
    domainEntity.read = raw.read;
    if (raw.notification) {
      domainEntity.notification = NotificationMapper.toDomain(raw.notification);
    }
    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: NotificationUser): NotificationUserEntity {
    const persistenceEntity = new NotificationUserEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.read = domainEntity.read;
    if (domainEntity.notification) {
      persistenceEntity.notification = NotificationMapper.toPersistence(
        domainEntity.notification,
      );
    }
    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
