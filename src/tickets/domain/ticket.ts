import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/domain/user';
import { TicketStatusEnum } from '../tickets.enum';
import { TicketComment } from 'src/ticket-comments/domain/ticket-comment';
import { TicketType } from 'src/ticket-types/domain/ticket-type';

export class Ticket {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  type: TicketType;

  @ApiProperty()
  status: TicketStatusEnum;

  @ApiProperty()
  comments: TicketComment[];

  @ApiProperty()
  createdBy: User;

  @ApiProperty()
  closedAt?: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
