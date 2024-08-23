import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'diagnostics_not_found',
    message: 'Diagnostic not found',
  },
  CurrentUserNotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'current_user_not_exists',
    message: 'Current User does not exist',
  },
  RequestNotExist: {
    status: HttpStatus.NOT_FOUND,
    error: 'request_not_exists',
    message: 'Request does not exist',
  },
  SpecialtyNotExist: {
    status: HttpStatus.NOT_FOUND,
    error: 'specialty_not_exists',
    message: 'Specialty does not exist',
  },
} as const;
