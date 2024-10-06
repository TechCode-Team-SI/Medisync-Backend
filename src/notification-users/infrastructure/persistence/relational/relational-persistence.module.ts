import { Module } from '@nestjs/common';
import { NotificationUserRepository } from '../notification-user.repository';
import { NotificationUserRelationalRepository } from './repositories/notification-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationUserEntity } from './entities/notification-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationUserEntity])],
  providers: [
    {
      provide: NotificationUserRepository,
      useClass: NotificationUserRelationalRepository,
    },
  ],
  exports: [NotificationUserRepository],
})
export class RelationalNotificationUserPersistenceModule {}
