// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateTicketCommentDto } from './create-ticket-comment.dto';

export class UpdateTicketCommentDto extends PartialType(
  CreateTicketCommentDto,
) {}
