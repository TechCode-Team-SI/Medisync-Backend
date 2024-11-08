import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TicketStatusEnum, TicketTypeEnum } from '../tickets.enum';
import { TicketTypeIdDto } from 'src/ticket-types/dto/tickey-type-id.dto';
import { Type } from 'class-transformer';

export class CreateTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TicketStatusEnum)
  status?: TicketStatusEnum;

  @ApiProperty()
  @IsEnum(TicketTypeEnum)
  type: TicketTypeEnum;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => TicketTypeIdDto)
  ticketTag: TicketTypeIdDto;
}
