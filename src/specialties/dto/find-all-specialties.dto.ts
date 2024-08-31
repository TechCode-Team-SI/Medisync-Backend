import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { Specialty } from '../domain/specialty';

export class SortSpecialtyDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Specialty;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FilterSpecialtyDto {
  //Search by name
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  employeeProfileIds?: string[] | null;
}

export class FindAllSpecialtiesDto {
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
  @Transform(ObjectTransformer(FilterSpecialtyDto))
  @ValidateNested()
  @Type(() => FilterSpecialtyDto)
  filters?: FilterSpecialtyDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(ObjectTransformer(SortSpecialtyDto))
  @ValidateNested({ each: true })
  @Type(() => SortSpecialtyDto)
  sort?: SortSpecialtyDto[] | null;
}
