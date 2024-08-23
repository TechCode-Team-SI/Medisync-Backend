import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'request_templates_not_found',
    message: 'Request Template not found',
  },
  RequestTemplateAlreadyExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'request_template_already_exists',
    message: 'Request Template already exists',
  },
  FieldQuestionNotExists: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'field_question_not_exists',
    message: 'Field question does not exists',
  },
} as const;
