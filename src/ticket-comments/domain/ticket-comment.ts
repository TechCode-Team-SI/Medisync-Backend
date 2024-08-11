import { ApiProperty } from '@nestjs/swagger';
import { Ticket } from 'src/tickets/domain/ticket';
import { User } from 'src/users/domain/user';

export class TicketComment {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  createdBy: User;

  @ApiProperty()
  ticket: Ticket;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
