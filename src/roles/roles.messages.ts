import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  AlreadyExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'role_already_exists',
    message: 'El rol ya existe',
  },
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'role_not_found',
    message: 'Rol no encontrado',
  },
  Inmutable: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'role_immutable',
    message: 'Este rol no puede ser modificado',
  },
  PermissionNotExist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'permission_not_exist',
    message: 'Los permisos proporcionados no existen',
  },
};
