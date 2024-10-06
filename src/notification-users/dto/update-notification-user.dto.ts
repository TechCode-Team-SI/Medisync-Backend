// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateNotificationUserDto } from './create-notification-user.dto';

export class UpdateNotificationUserDto extends PartialType(
  CreateNotificationUserDto,
) {}
