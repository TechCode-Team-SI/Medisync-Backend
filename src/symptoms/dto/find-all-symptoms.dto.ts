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
import { Symptom } from '../domain/symptom';

export class SortSymptomsDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Symptom;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FilterSymptomsDto {
  //Search by name
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}

export class FindAllSymptomsDto {
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
  @Transform(ObjectTransformer(SortSymptomsDto))
  @ValidateNested({ each: true })
  @Type(() => SortSymptomsDto)
  sort?: SortSymptomsDto[] | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterSymptomsDto))
  @ValidateNested()
  @Type(() => FilterSymptomsDto)
  filters?: FilterSymptomsDto | null;
}
