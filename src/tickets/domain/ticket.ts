import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/domain/user';
import { TicketStatusEnum, TicketTypeEnum } from '../tickets.enum';

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
  type: TicketTypeEnum;

  @ApiProperty()
  status: TicketStatusEnum;

  @ApiProperty()
  createdBy: User;

  @ApiProperty()
  closedAt?: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
