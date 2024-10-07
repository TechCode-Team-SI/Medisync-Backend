import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'schedules_not_found',
    message: 'Schedule not found',
  },
  InvalidFromTo: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'schedules_invalid_from_to',
    message: 'Rango de horas invalida',
  },
  ScheduleHasEmployees: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'schedule_has_employees',
    message: 'El horario tiene empleados asignados',
  },
} as const;
