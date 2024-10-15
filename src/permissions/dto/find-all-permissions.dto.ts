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

export class SortPermissionDto {
  @ApiSortProperty({ enum: ['name', 'slug', 'createdAt'] })
  @Type(() => String)
  @IsString()
  orderBy: string;

  @ApiSortProperty({ enum: OrderEnum })
  @IsString()
  order: string;
}

export class FilterPermissionDto {
  //Search by name
  @ApiFilterProperty({ description: 'Search by name' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class FindAllpermissionsDto {
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

  @ApiPropertyOptional({ type: () => FilterPermissionDto })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterPermissionDto))
  @ValidateNested()
  @Type(() => FilterPermissionDto)
  filters?: FilterPermissionDto | null;

  @ApiPropertyOptional({ type: () => SortPermissionDto, isArray: true })
  @IsOptional()
  @Transform(ObjectTransformer(SortPermissionDto))
  @ValidateNested({ each: true })
  @Type(() => SortPermissionDto)
  sort?: SortPermissionDto[] | null;
}
