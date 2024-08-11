import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'ticket_comments_not_found',
    message: 'Ticket Comment not found',
  },
  CommenterNotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'commenter_not_found',
    message: 'Commenter not found',
  },
  TicketNotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'ticket_not_found',
    message: 'Ticket not found',
  },
} as const;
