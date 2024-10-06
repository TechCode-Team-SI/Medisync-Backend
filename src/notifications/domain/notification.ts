import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationTypeEnum } from '../notifications.enum';
import { NotificationUser } from 'src/notification-users/domain/notification-user';

export class Notification {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  type: NotificationTypeEnum;

  @ApiPropertyOptional({ type: () => NotificationUser, isArray: true })
  notificationUsers?: NotificationUser[] | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
