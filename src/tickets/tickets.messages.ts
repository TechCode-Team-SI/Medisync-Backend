import { HttpStatus } from '@nestjs/common';
import { HTTPErrorMessage } from 'src/utils/types/http-error-message.type';

export const exceptionResponses: HTTPErrorMessage = {
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'tickets_not_found',
    message: 'Ticket not found',
  },
  StatusClosed: {
    status: HttpStatus.NOT_FOUND,
    error: 'ticket_already_closed',
    message: 'Ticket is already closed',
  },
  TicketOwnerNotFound: {
    status: HttpStatus.NOT_FOUND,
    error: 'ticket_owner_not_found',
    message: 'Owner of the ticket not found',
  },
} as const;
