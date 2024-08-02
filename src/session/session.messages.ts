import { HttpStatus } from '@nestjs/common';

export const exceptionResponses = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    errors: {
      message: 'Session not found',
    },
  },
};
