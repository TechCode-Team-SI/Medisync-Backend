import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { RequestTemplate } from '../domain/request-template';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';

export class SortRequestTemplateDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof RequestTemplate;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FilterRequestTemplateDto {
  //Search by name
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}

export class FindAllRequestTemplatesDto {
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
  @Transform(ObjectTransformer(SortRequestTemplateDto))
  @ValidateNested({ each: true })
  @Type(() => SortRequestTemplateDto)
  sort?: SortRequestTemplateDto[] | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterRequestTemplateDto))
  @ValidateNested()
  @Type(() => FilterRequestTemplateDto)
  filters?: FilterRequestTemplateDto | null;
}
