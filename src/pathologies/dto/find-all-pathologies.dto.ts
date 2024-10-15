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

export class SortPathologiesDto {
  @ApiSortProperty({ enum: ['name', 'createdAt'] })
  @Type(() => String)
  @IsString()
  orderBy: string;

  @ApiSortProperty({ enum: OrderEnum })
  @IsString()
  order: string;
}

export class FilterPathologiesDto {
  //Search by name
  @ApiFilterProperty({ description: 'Search by name' })
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

  @ApiPropertyOptional({ type: () => SortPathologiesDto, isArray: true })
  @IsOptional()
  @Transform(ObjectTransformer(SortPathologiesDto))
  @ValidateNested({ each: true })
  @Type(() => SortPathologiesDto)
  sort?: SortPathologiesDto[] | null;

  @ApiPropertyOptional({ type: () => FilterPathologiesDto })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterPathologiesDto))
  @ValidateNested()
  @Type(() => FilterPathologiesDto)
  filters?: FilterPathologiesDto | null;
}
