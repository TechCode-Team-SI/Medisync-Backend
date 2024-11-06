import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderEnum } from 'src/common/order.enum';
import { ApiFilterProperty } from 'src/utils/decorators/filter-property';
import { ApiSortProperty } from 'src/utils/decorators/sort-property';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { RequestStatusEnum } from '../requests.enum';

export class FilterRequestDto {
  @ApiFilterProperty({ isArray: true, type: String })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requestedMedicIds?: string[] | null;

  @ApiFilterProperty({ isArray: true, type: String })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  madeByIds?: string[] | null;

  @ApiFilterProperty({ isArray: true, type: String })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  madeForIds?: string[] | null;

  @ApiFilterProperty({ isArray: true, type: String })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  savedToIds?: string[] | null;

  @ApiFilterProperty({ isArray: true, type: String })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requestTemplateIds?: string[] | null;

  @ApiFilterProperty({ type: String, enum: RequestStatusEnum })
  @IsOptional()
  @IsEnum(RequestStatusEnum)
  status?: RequestStatusEnum[] | null;

  @ApiFilterProperty({ type: String })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  from?: Date;

  @ApiFilterProperty({ type: String })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  to?: Date;
}

export class SortRequestDto {
  @ApiSortProperty({ enum: ['createdAt', 'patientFullName', 'patientDNI'] })
  @Type(() => String)
  @IsString()
  orderBy: string;

  @ApiSortProperty({ enum: OrderEnum })
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

  @ApiPropertyOptional({ type: () => FilterRequestDto })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterRequestDto))
  @ValidateNested()
  @Type(() => FilterRequestDto)
  filters?: FilterRequestDto | null;

  @ApiPropertyOptional({ type: () => SortRequestDto, isArray: true })
  @IsOptional()
  @Transform(ObjectTransformer(SortRequestDto))
  @ValidateNested({ each: true })
  @Type(() => SortRequestDto)
  sort?: SortRequestDto[] | null;
}
