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

export class SortArticleDto {
  @ApiSortProperty({ enum: ['createdAt', 'title'] })
  @Type(() => String)
  @IsString()
  orderBy: string;

  @ApiSortProperty({ enum: OrderEnum })
  @IsString()
  order: string;
}

export class FilterArticleDto {
  //Search by name
  @ApiFilterProperty({ description: 'Search by title' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class FindAllArticlesDto {
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

  @ApiPropertyOptional({ type: () => SortArticleDto, isArray: true })
  @IsOptional()
  @Transform(ObjectTransformer(SortArticleDto))
  @ValidateNested({ each: true })
  @Type(() => SortArticleDto)
  sort?: SortArticleDto[] | null;

  @ApiPropertyOptional({ type: () => FilterArticleDto })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterArticleDto))
  @ValidateNested()
  @Type(() => FilterArticleDto)
  filters?: FilterArticleDto | null;
}
