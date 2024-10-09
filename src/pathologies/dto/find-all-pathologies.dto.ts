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
import { Pathology } from '../domain/pathology';

export class SortPathologiesDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Pathology;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FilterPathologiesDto {
  //Search by name
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}

export class FindAllPathologiesDto {
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
  @Transform(ObjectTransformer(SortPathologiesDto))
  @ValidateNested({ each: true })
  @Type(() => SortPathologiesDto)
  sort?: SortPathologiesDto[] | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterPathologiesDto))
  @ValidateNested()
  @Type(() => FilterPathologiesDto)
  filters?: FilterPathologiesDto | null;
}
