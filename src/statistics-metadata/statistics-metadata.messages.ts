import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'statistics_metadata_not_found',
    message: 'Statisticsmetadata not found',
  },
  FieldQuestionNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'field_question_not_found',
    message: 'Field question not found',
  },
} as const;
