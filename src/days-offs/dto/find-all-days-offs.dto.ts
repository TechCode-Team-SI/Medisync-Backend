import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
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
import { DaysOff } from '../domain/days-off';

export class SortDaysOffsDto {
  @ApiSortProperty({ enum: ['createdAt'] })
  @Type(() => String)
  @IsString()
  orderBy: keyof DaysOff;

  @ApiSortProperty({ enum: OrderEnum })
  @IsString()
  order: string;
}

export class FilterDaysOffsDto {
  @ApiFilterProperty({ type: String, isArray: true })
  @IsOptional()
  employeeIds?: string[] | null;

  @ApiFilterProperty({ type: String, isArray: true })
  @IsOptional()
  agendaIds?: string[] | null;

  @ApiFilterProperty({ type: String, isArray: true })
  @IsOptional()
  specialtyIds?: string[] | null;
}

export class FindAllDaysOffsDto {
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

  @ApiPropertyOptional({ type: () => SortDaysOffsDto, isArray: true })
  @IsOptional()
  @Transform(ObjectTransformer(SortDaysOffsDto))
  @ValidateNested({ each: true })
  @Type(() => SortDaysOffsDto)
  sort?: SortDaysOffsDto[] | null;

  @ApiPropertyOptional({ type: () => FilterDaysOffsDto })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterDaysOffsDto))
  @ValidateNested()
  @Type(() => FilterDaysOffsDto)
  filters?: FilterDaysOffsDto | null;
}
