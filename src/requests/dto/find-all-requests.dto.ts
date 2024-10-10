import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { Request } from '../domain/request';
import { RequestStatusEnum } from '../requests.enum';

export class FilterRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requestedMedicIds?: string[] | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  madeByIds?: string[] | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  madeForIds?: string[] | null;

  @ApiPropertyOptional({ type: RequestStatusEnum })
  @IsOptional()
  @IsEnum(RequestStatusEnum)
  status?: RequestStatusEnum | null;
}

export class SortRequestDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Request;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FindAllRequestsDto {
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
  @Transform(ObjectTransformer(FilterRequestDto))
  @ValidateNested()
  @Type(() => FilterRequestDto)
  filters?: FilterRequestDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(ObjectTransformer(SortRequestDto))
  @ValidateNested({ each: true })
  @Type(() => SortRequestDto)
  sort?: SortRequestDto[] | null;
}
