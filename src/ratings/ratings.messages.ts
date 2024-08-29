import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'ratings_not_found',
    message: 'Rating not found',
  },
  UserNotCreateRequest: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user__not_create_request',
    message: 'This user is not allowed to rate this request',
  },
  UserNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_not_exist',
    message: 'User does not exists',
  },
  RequestNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'request_not_exist',
    message: 'Request does not exists',
  },
  RequestNotCompleted: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'request_not_completed',
    message: 'Request does not completed',
  },
  StarsOutRange: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'stars_out_range',
    message: 'Stars out of range',
  },
  RequestAlreadyRated: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'request_already_rated',
    message: 'Request already rated',
  },
} as const;
