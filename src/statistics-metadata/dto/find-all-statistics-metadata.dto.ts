import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { StatisticsMetadata } from '../domain/statistics-metadata';

export class SortStatisticsMetadataDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof StatisticsMetadata;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FindAllStatisticsMetadataDto {
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
  @Transform(ObjectTransformer(SortStatisticsMetadataDto))
  @ValidateNested({ each: true })
  @Type(() => SortStatisticsMetadataDto)
  sort?: SortStatisticsMetadataDto[] | null;
}
