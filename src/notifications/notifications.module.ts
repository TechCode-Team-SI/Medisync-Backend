import { forwardRef, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { RelationalNotificationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { NotificationsController } from './notification.controller';
import { NotificationUsersModule } from 'src/notification-users/notification-users.module';
import { UsersModule } from 'src/users/users.module';
import { SocketModule } from 'src/socket/socket.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    RelationalNotificationPersistenceModule,
    forwardRef(() => NotificationUsersModule),
    forwardRef(() => UsersModule),
    SocketModule,
    MailModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService, RelationalNotificationPersistenceModule],
})
export class NotificationsModule {}
