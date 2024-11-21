import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderEnum } from 'src/common/order.enum';
import { ApiFilterProperty } from 'src/utils/decorators/filter-property';
import { ApiSortProperty } from 'src/utils/decorators/sort-property';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { TicketStatusEnum, TicketTypeEnum } from '../tickets.enum';

export class FilterTicketDto {
  @ApiFilterProperty({ type: String, enum: TicketStatusEnum })
  @IsOptional()
  @IsEnum(TicketStatusEnum)
  status?: TicketStatusEnum | null;

  @ApiFilterProperty({ type: String, enum: TicketTypeEnum })
  @IsOptional()
  @IsEnum(TicketTypeEnum)
  type?: TicketTypeEnum | null;

  @ApiFilterProperty({ isArray: true, type: String })
  @IsOptional()
  @IsString()
  createdByIds?: string[] | null;

  //Search by name
  @ApiFilterProperty({ description: 'Search by title' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class SortTicketDto {
  @ApiSortProperty({ enum: ['createdAt', 'title'] })
  @Type(() => String)
  @IsString()
  orderBy: string;

  @ApiSortProperty({ enum: OrderEnum })
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

  @ApiPropertyOptional({ type: () => FilterTicketDto })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterTicketDto))
  @ValidateNested()
  @Type(() => FilterTicketDto)
  filters?: FilterTicketDto | null;

  @ApiPropertyOptional({ type: () => SortTicketDto, isArray: true })
  @IsOptional()
  @Transform(ObjectTransformer(SortTicketDto))
  @ValidateNested({ each: true })
  @Type(() => SortTicketDto)
  sort?: SortTicketDto[] | null;
}
