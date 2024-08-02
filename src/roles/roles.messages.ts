import { HttpStatus } from '@nestjs/common';

export const exceptionResponses = {
  AlreadyExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    errors: {
      name: 'Role already exists',
    },
  },
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    errors: {
      name: 'Role not found',
    },
  },
};
