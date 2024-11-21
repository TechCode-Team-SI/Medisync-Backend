import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTicketCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  comment: string;
}
