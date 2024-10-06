import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'notifications_not_found',
    message: 'Notification not found',
  },
  NotPermitted: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'notifications_not_permitted',
    message: 'You do not have permission to do this action',
  },
} as const;
