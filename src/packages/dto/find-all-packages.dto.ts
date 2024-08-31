import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { Package } from '../domain/package';

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
}
