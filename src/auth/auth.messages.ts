import { HttpStatus } from '@nestjs/common';

export const exceptionResponses = {
  IncorrectPassword: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    errors: {
      password: 'Password is incorrect',
    },
  },
  UserNotFound: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    errors: {
      email: 'User Not Found',
    },
  },
  InvalidHash: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    errors: {
      hash: `Invalid Hash`,
    },
  },
  EmailNotExist: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    errors: {
      email: 'Email does not exist',
    },
  },
};
