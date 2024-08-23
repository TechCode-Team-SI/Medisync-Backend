import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'article_not_found',
    message: 'Articulo no encontrado',
  },
  UserNotFound: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'auth_user_not_exist',
    message: 'El usuario no existe',
  },
} as const;
