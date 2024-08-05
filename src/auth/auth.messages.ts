import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  IncorrectPassword: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'auth_incorrect_password',
    message: 'Contraseña incorrecta',
  },
  UserNotFound: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_not_found',
    message: 'Usuario no encontrado',
  },
  InvalidHash: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'invalid_hash',
    message: 'Hash invalido',
  },
  EmailNotExist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'email_not_exist',
    message: 'Email no existe',
  },
  InvalidPasswordReset: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'invalid_password_reset',
    message: 'reinicio de contraseña invalido',
  },
  InvalidConfirmEmail: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'invalid_confirm_email',
    message: 'confirmacion de email invalida',
  },
};
