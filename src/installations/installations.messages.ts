import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'installation_step_not_found',
    message: 'Installation Step not found',
  },
  AlreadyExists: {
    status: HttpStatus.NOT_FOUND,
    error: 'installation_step_already_exists',
    message: 'Installation Step Already Exists',
  },
} as const;
