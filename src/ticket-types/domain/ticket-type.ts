import { ApiProperty } from '@nestjs/swagger';
import { Ticket } from 'src/tickets/domain/ticket';

export class TicketType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  ticket: Ticket;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
