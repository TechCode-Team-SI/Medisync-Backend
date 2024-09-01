import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { RequestSavedData } from '../domain/request-saved-data';

export class SortRequestSavedDataDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof RequestSavedData;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FilterRequestSavedDataDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsString()
  requestTemplateId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  userIds?: string[] | null;
}

export class FindAllRequestSavedDataDto {
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
  @Transform(ObjectTransformer(FilterRequestSavedDataDto))
  @ValidateNested()
  @Type(() => FilterRequestSavedDataDto)
  filters?: FilterRequestSavedDataDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(ObjectTransformer(SortRequestSavedDataDto))
  @ValidateNested({ each: true })
  @Type(() => SortRequestSavedDataDto)
  sort?: SortRequestSavedDataDto[] | null;
}
