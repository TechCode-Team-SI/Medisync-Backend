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
import { Package } from '../domain/package';

export class FilterPackageDto {
  //Search by name
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}

export class SortPackageDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Package;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FindAllPackagesDto {
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
  @Transform(ObjectTransformer(SortPackageDto))
  @ValidateNested({ each: true })
  @Type(() => SortPackageDto)
  sort?: SortPackageDto[] | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterPackageDto))
  @ValidateNested()
  @Type(() => FilterPackageDto)
  filters?: FilterPackageDto | null;
}
