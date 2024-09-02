import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'request_saved_data_not_found',
    message: 'Request saved data not found',
  },
  UserNotExist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_not_exist',
    message: 'User does not exist',
  },
  RequestNotExist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'request_not_exist',
    message: 'Request does not exist',
  },
  UserNotOwnerOfRequest: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_not_owner_of_request',
    message: 'The user is not the owner of the request',
  },
} as const;
