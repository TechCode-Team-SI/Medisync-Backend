import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'notification_users_not_found',
    message: 'Notification user not found',
  },
  notificationNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'notification_not_exists',
    message: 'Notification not found',
  },
} as const;
