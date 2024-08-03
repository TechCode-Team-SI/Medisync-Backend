import { HttpStatus } from '@nestjs/common';

export const exceptionResponses = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    errors: {
      name: 'Article not found',
    },
  },
  UserNotFound: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    errors: {
      name: 'Auth User does not exist',
    },
  },
};
