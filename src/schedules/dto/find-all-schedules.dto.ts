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
import { Schedule } from '../domain/schedule';

export class FilterSchedulesDto {
  //Search by name
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}

export class SortSchedulesDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Schedule;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FindAllSchedulesDto {
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
  @Transform(ObjectTransformer(SortSchedulesDto))
  @ValidateNested({ each: true })
  @Type(() => SortSchedulesDto)
  sort?: SortSchedulesDto[] | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterSchedulesDto))
  @ValidateNested()
  @Type(() => FilterSchedulesDto)
  filters?: FilterSchedulesDto | null;
}
