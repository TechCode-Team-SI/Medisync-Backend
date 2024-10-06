import { forwardRef, Module } from '@nestjs/common';
import { NotificationUsersService } from './notification-users.service';
import { RelationalNotificationUserPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    RelationalNotificationUserPersistenceModule,
    forwardRef(() => NotificationsModule),
  ],
  providers: [NotificationUsersService],
  exports: [
    NotificationUsersService,
    RelationalNotificationUserPersistenceModule,
  ],
})
export class NotificationUsersModule {}
