import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TicketStatusEnum, TicketTypeEnum } from '../tickets.enum';
import { Type } from 'class-transformer';
import { TicketTypeIdDto } from 'src/ticket-types/dto/ticket-type-id.dto';
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
