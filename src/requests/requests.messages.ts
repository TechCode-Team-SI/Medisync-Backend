import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'requests_not_found',
    message: 'Request not found',
  },
  RequestTemplateNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'requests_template_not_exist',
    message: 'Request template does not exists',
  },
  SpecialtyNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'specialty_not_exist',
    message: 'Specialty does not exists',
  },
  InvalidAnswer: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'invalid_request_answer',
    message: 'The answer you provided for one of the fields is invalid',
  },
  MedicNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'medic_not_exist',
    message: 'The medic does not exist',
  },
  CurrentUserNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'current_user_not_exists',
    message: 'The current user does not exist',
  },
  SelectedMedicNotAllowed: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'selected_medic_not_allowed',
    message: 'The medic you selected is not valid',
  },
  CurrentMedicNotAllowed: {
    status: HttpStatus.FORBIDDEN,
    error: 'current_medic_not_allowed',
    message: 'The current medic is not allowed to perform this action',
  },
} as const;
