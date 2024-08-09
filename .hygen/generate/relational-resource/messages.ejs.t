---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.messages.ts
---
import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: '<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %> not found',
    message: '<%= h.inflection.transform(name, ['capitalize']) %> not found'
  },
} as const;