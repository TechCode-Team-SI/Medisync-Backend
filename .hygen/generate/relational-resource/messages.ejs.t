---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.messages.ts
---
import { HttpStatus } from '@nestjs/common';

export const exceptionResponses = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    errors: {
      name: '<%= h.inflection.transform(name, ['capitalize']) %> not found',
    },
  },
};