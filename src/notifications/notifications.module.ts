import { forwardRef, Module } from '@nestjs/common';
import { NotificationUsersModule } from 'src/notification-users/notification-users.module';
import { SocketModule } from 'src/socket/socket.module';
import { UsersModule } from 'src/users/users.module';
import { RelationalNotificationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { NotificationsController } from './notification.controller';
import { NotificationsService } from './notifications.service';
import { BullModule } from '@nestjs/bullmq';
import { QueueName } from 'src/utils/queue-enum';

@Module({
  imports: [
    RelationalNotificationPersistenceModule,
    forwardRef(() => NotificationUsersModule),
    forwardRef(() => UsersModule),
    SocketModule,
    BullModule.registerQueue({ name: QueueName.MAIL }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService, RelationalNotificationPersistenceModule],
})
export class NotificationsModule {}
