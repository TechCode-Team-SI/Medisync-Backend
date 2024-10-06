import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NotificationIdDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
