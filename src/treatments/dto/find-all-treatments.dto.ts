import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
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

export class SortTreatmentsDto {
  @ApiSortProperty({ enum: ['createdAt', 'name'] })
  @Type(() => String)
  @IsString()
  orderBy: string;

  @ApiSortProperty({ enum: OrderEnum })
  @IsString()
  order: string;
}

export class FilterTreatmentsDto {
  //Search by name
  @ApiFilterProperty({ description: 'search by name' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class FindAlltreatmentsDto {
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

  @ApiPropertyOptional({ type: () => SortTreatmentsDto, isArray: true })
  @IsOptional()
  @Transform(ObjectTransformer(SortTreatmentsDto))
  @ValidateNested({ each: true })
  @Type(() => SortTreatmentsDto)
  sort?: SortTreatmentsDto[] | null;

  @ApiPropertyOptional({ type: () => FilterTreatmentsDto })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterTreatmentsDto))
  @ValidateNested()
  @Type(() => FilterTreatmentsDto)
  filters?: FilterTreatmentsDto | null;
}
