import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'packages_not_found',
    message: 'Package not found',
  },
  UnexpectedError: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    error: 'unexpected_error',
    message: 'Unexpected error during installation, please try again',
  },
} as const;
