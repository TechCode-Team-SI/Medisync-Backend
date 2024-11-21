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
  NotEmployee: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_not_employee',
    message: 'El usuario no es un empleado',
  },
  CannotChangeOwnStatus: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_cannot_change_own_status',
    message: 'No puedes cambiar tu propio status',
  },
  PatientNotFound: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_patient_not_found',
    message: 'Usuario paciente no encontrado',
  },
  PatientAlreadyExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_patient_not_already_exists',
    message: 'El usuario paciente que intenta crear ya existe',
  },
  UserPatientNotCreated: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'user_patient_could_not_be_created',
    message: 'El perfil de paciente no pudo ser creado',
  },
  SpecialtyAlreadyOwned: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'specialty_already_owned',
    message: 'El usuario ya tiene la especialidad',
  },
  SpecialtyNotOwned: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'specialty_not_owned',
    message: 'El usuario no tiene la especialidad',
  },
  SpecialtyNotExist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'specialty_not_exist',
    message: 'La especialidad no existe',
  },
  AgendaNotExist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'agenda_not_exist',
    message: 'La agenda no existe',
  },
  ScheduleNotExist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'schedule_not_exist',
    message: 'El horario no existe',
  },
  RoomNotExist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'room_not_exist',
    message: 'La sala no existe',
  },
} as const;
