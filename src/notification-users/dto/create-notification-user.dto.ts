import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, ValidateNested } from 'class-validator';
import { NotificationIdDto } from './notification-id.dto';
import { Type } from 'class-transformer';

export class CreateNotificationUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => NotificationIdDto)
  notification: NotificationIdDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  read: boolean;
}
