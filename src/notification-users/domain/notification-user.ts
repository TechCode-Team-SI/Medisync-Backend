import { ApiProperty } from '@nestjs/swagger';
import { Notification } from 'src/notifications/domain/notification';
import { User } from 'src/users/domain/user';

export class NotificationUser {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({ type: () => Notification })
  notification: Notification;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty()
  read: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
