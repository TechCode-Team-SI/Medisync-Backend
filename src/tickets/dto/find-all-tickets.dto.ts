import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { TicketTypeEnum } from '../tickets.enum';
import { isValueInEnum } from 'src/utils/utils';

export class FindAllTicketsDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => {
    if (!value) return null;
    const isValidType = isValueInEnum(TicketTypeEnum, value);
    if (!isValidType) return null;
    return value;
  })
  @IsOptional()
  type?: TicketTypeEnum;
}
