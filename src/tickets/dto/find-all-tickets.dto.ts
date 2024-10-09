import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { Ticket } from '../domain/ticket';
import { TicketStatusEnum, TicketTypeEnum } from '../tickets.enum';

export class FilterTicketDto {
  @ApiPropertyOptional({ type: TicketStatusEnum })
  @IsOptional()
  @IsEnum(TicketStatusEnum)
  status?: TicketStatusEnum | null;

  @ApiPropertyOptional({ type: TicketTypeEnum })
  @IsOptional()
  @IsEnum(TicketTypeEnum)
  type?: TicketTypeEnum | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  createdByIds?: string[] | null;

  //Search by name
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}

export class SortTicketDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Ticket;

  @ApiProperty()
  @IsString()
  order: string;
}

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

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterTicketDto))
  @ValidateNested()
  @Type(() => FilterTicketDto)
  filters?: FilterTicketDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(ObjectTransformer(SortTicketDto))
  @ValidateNested({ each: true })
  @Type(() => SortTicketDto)
  sort?: SortTicketDto[] | null;
}
