import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'specialties not found',
    message: 'Specialty not found',
  },
  ImageNotExist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'avatar_not_exist',
    message: 'La imagen no existe',
  },
  UserNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_not_exists',
    message: 'The user does not exist',
  },
  UserNotSpecialist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_not_specialist',
    message: 'The user is not a specialist',
  },
} as const;
