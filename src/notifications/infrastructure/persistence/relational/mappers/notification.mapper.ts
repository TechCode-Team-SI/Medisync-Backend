import { NotificationUserMapper } from 'src/notification-users/infrastructure/persistence/relational/mappers/notification-user.mapper';
import { Notification } from '../../../../domain/notification';
import { NotificationEntity } from '../entities/notification.entity';

export class NotificationMapper {
  static toDomain(raw: NotificationEntity): Notification {
    const domainEntity = new Notification();
    domainEntity.id = raw.id;
    domainEntity.title = raw.title;
    domainEntity.content = raw.content;
    domainEntity.type = raw.type;
    if (raw.notificationUsers) {
      domainEntity.notificationUsers = raw.notificationUsers.map((notif) =>
        NotificationUserMapper.toDomain(notif),
      );
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static flattenNotificationPerUser(domainEntity: Notification) {
    const notifUser = domainEntity.notificationUsers
      ? domainEntity.notificationUsers[0]
      : null;

    return {
      id: domainEntity.id,
      notificationUserId: notifUser?.id,
      title: domainEntity.title,
      content: domainEntity.content,
      type: domainEntity.type,
      read: notifUser?.read,
      createdAt: domainEntity.createdAt,
      updatedAt: domainEntity.updatedAt,
    };
  }

  static toPersistence(domainEntity: Notification): NotificationEntity {
    const persistenceEntity = new NotificationEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    if (domainEntity.notificationUsers) {
      persistenceEntity.notificationUsers = domainEntity.notificationUsers.map(
        (notif) => NotificationUserMapper.toPersistence(notif),
      );
    }
    persistenceEntity.type = domainEntity.type;
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.content = domainEntity.content;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
