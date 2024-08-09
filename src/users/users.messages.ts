import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  AlreadyExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_already_exists',
    message: 'El usuario ya existe',
  },
  ProfileAlreadyExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'profile_already_exists',
    message: 'El perfil ya existe',
  },
  EmailTaken: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'email_already_in_use',
    message: 'El correo electrónico ya está en uso',
  },
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'user_not_found',
    message: 'Usuario no encontrado',
  },
  AvatarNotExist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'avatar_not_exist',
    message: 'La imagen no existe',
  },
  RoleNotExist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'role_not_exist',
    message: 'El rol no existe',
  },
} as const;
