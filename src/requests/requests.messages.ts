import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'requests_not_found',
    message: 'Solicitud no encontrada',
  },
  RequestTemplateNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'requests_template_not_exist',
    message: 'La planilla de solicitud no existe',
  },
  SpecialtyNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'specialty_not_exist',
    message: 'La especialidad no existe',
  },
  InvalidAnswer: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'invalid_request_answer',
    message: 'La respuesta que ingresaste para uno de los campos es invalida',
  },
  MedicNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'medic_not_exist',
    message: 'El medico no existe',
  },
  CurrentUserNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'current_user_not_exists',
    message: 'El usuario actual no existe',
  },
  SelectedMedicNotAllowed: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'selected_medic_not_allowed',
    message: 'El medico que seleccionaste no esta permitido',
  },
  PatientNotAllowed: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_patient_not_allowed',
    message: 'Paciente no permitido',
  },
  PatientNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_patient_not_exist',
    message: 'Paciente no existe',
  },
  CurrentMedicNotAllowed: {
    status: HttpStatus.FORBIDDEN,
    error: 'current_medic_not_allowed',
    message: 'The current medic is not allowed to perform this action',
  },
  CurrentUserNotAllowed: {
    status: HttpStatus.FORBIDDEN,
    error: 'current_user_not_allowed',
    message: 'The current user is not allowed to perform this action',
  },
  InvalidReferenceOneSelf: {
    status: HttpStatus.FORBIDDEN,
    error: 'invalid_reference_to_oneself',
    message: "You can't reference to yourself",
  },
  StatusNotPending: {
    status: HttpStatus.FORBIDDEN,
    error: 'request_status_not_pending',
    message: 'The request status needs to be pending to perform this action',
  },
  StatusNotAttending: {
    status: HttpStatus.FORBIDDEN,
    error: 'request_status_not_attending',
    message: 'The request status needs to be attending to perform this action',
  },
  MedicNotRequested: {
    status: HttpStatus.BAD_REQUEST,
    error: 'medic_not_requested',
    message: 'Medic should be requested if specialty is not group',
  },
} as const;
