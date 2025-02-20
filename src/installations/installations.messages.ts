import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'installation_step_not_found',
    message: 'Installation Step not found',
  },
  AlreadyExists: {
    status: HttpStatus.NOT_FOUND,
    error: 'installation_step_already_exists',
    message: 'Installation Step Already Exists',
  },
  UserAlreadyExists: {
    status: HttpStatus.NOT_FOUND,
    error: 'installation_step_one_user_already_exists',
    message:
      'User already exists, it should not be possible, please contact technical support',
  },
  RoleNotExists: {
    status: HttpStatus.NOT_FOUND,
    error: 'installation_step_one_role_not_exists',
    message:
      'Default Admin Role does not exist, it should not be possible, please contact technical support',
  },
  UserNotCreated: {
    status: HttpStatus.NOT_FOUND,
    error: 'installation_step_one_user_not_created',
    message:
      'First Admin User not created, it should not be possible, please contact technical support',
  },
  MedicalCenterAlreadyExists: {
    status: HttpStatus.NOT_FOUND,
    error: 'installation_step_two_medical_center_already_exists',
    message:
      'Medical center already exists, it should not be possible, please contact technical support',
  },
  MedicalCenterNotCreated: {
    status: HttpStatus.NOT_FOUND,
    error: 'installation_step_two_medical_center_not_created',
    message:
      'Medical center not created, it should not be possible, please contact technical support',
  },
  InstallationNotComplete: {
    status: HttpStatus.FORBIDDEN,
    error: 'installation_pending',
    message:
      'Installation of the medical center is not complete, please complete the installation',
  },
  InstallationAlreadyComplete: {
    status: HttpStatus.FORBIDDEN,
    error: 'installation_already_finished',
    message: 'System already installed',
  },
  SystemNotInstalled: {
    status: HttpStatus.FORBIDDEN,
    error: 'system_not_installed',
    message: 'System not installed',
  },
  InvalidToken: {
    status: HttpStatus.FORBIDDEN,
    error: 'invalid_token',
    message: 'Invalid token',
  },
} as const;
