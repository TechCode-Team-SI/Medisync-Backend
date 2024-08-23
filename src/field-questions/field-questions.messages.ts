import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'field_questions_not_found',
    message: 'Field Question not found',
  },
  AlreadyExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'field_questions_already_exists',
    message: 'Field Question already exists',
  },
  SelectionInputsNotProvided: {
    status: HttpStatus.BAD_REQUEST,
    error: 'selection_inputs_not_provided',
    message:
      'some expected selection properties were not provided in the request',
  },
} as const;
