import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'days_offs_not_found',
    message: 'Dias libres no encontrados',
  },
  UserNotPermitted: {
    status: HttpStatus.FORBIDDEN,
    error: 'user_not_permitted',
    message: 'Solo empleados pueden acceder a esta funcionalidad',
  },
  AgendaNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'agenda_not_exists',
    message: 'La agenda no existe',
  },
  EmployeeNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'employee_not_exists',
    message: 'El empleado no existe',
  },
  InvalidType: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'type_invalid',
    message: 'El tipo provisto no es valido',
  },
} as const;
