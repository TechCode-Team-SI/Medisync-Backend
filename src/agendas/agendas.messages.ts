import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'agendas_not_found',
    message: 'La agenda no se encontro',
  },
  SpecialtyNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'specialty_not_exists',
    message: 'La especialidad no existe',
  },
  SpecialtyIsNotGroup: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'specialty_is_not_group',
    message: 'La especialidad debe ser grupal',
  },
  EmployeeNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'employee_not_exists',
    message: 'El empleado no existe',
  },
  UserNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_not_exists',
    message: 'El usuario no existe',
  },
} as const;
