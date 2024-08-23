import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'medical_centers_not_found',
    message: 'Medicalcenter not found',
  },

  Created: {
    status: HttpStatus.CREATED,
    error: 'medical_centers_already_created',
    message: 'Medicalcenter already created',
  },
} as const;
