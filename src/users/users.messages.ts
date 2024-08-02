import { HttpStatus } from '@nestjs/common';

export const exceptionResponses = {
  AlreadyExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    errors: {
      name: 'User already exists',
    },
  },
  EmailTaken: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    errors: {
      name: 'Email already taken',
    },
  },
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    errors: {
      name: 'User not found',
    },
  },
  AvatarNotExist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    errors: {
      photo: 'Image does not exist',
    },
  },
  RoleNotExist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    errors: {
      role: 'Role does not exist',
    },
  },
};
