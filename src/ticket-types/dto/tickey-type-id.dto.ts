import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TicketTypeIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
