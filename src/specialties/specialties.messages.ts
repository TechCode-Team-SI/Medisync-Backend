import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'specialties not found',
    message: 'No se encontraron especialidades',
  },
  ImageNotExist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'avatar_not_exist',
    message: 'La imagen no existe',
  },
  UserNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_not_exists',
    message: 'El usuario no existe',
  },
  UserNotSpecialist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_not_specialist',
    message: 'El usuario no es especialista',
  },
  RequestTemplateNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'request_template_not_exists',
    message: 'La plantilla de solicitud no existe',
  },
} as const;
