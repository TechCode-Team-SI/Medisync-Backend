import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { DaysOff } from '../domain/days-off';

export class SortDaysOffsDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof DaysOff;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FilterDaysOffsDto {
  @ApiPropertyOptional()
  @IsOptional()
  employeeIds?: string[] | null;

  @ApiPropertyOptional()
  @IsOptional()
  agendaIds?: string[] | null;

  @ApiPropertyOptional()
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

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(ObjectTransformer(SortDaysOffsDto))
  @ValidateNested({ each: true })
  @Type(() => SortDaysOffsDto)
  sort?: SortDaysOffsDto[] | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterDaysOffsDto))
  @ValidateNested()
  @Type(() => FilterDaysOffsDto)
  filters?: FilterDaysOffsDto | null;
}
