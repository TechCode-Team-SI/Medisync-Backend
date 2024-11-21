import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiFilterProperty } from 'src/utils/decorators/filter-property';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';

export class FilterAvailableSpecialties {
  //Search by name
  @ApiFilterProperty({ description: 'Search by name' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class GetAvailableSpecialtiesDto {
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

  @ApiPropertyOptional({ type: () => FilterAvailableSpecialties })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterAvailableSpecialties))
  @ValidateNested()
  @Type(() => FilterAvailableSpecialties)
  filters?: FilterAvailableSpecialties | null;
}
