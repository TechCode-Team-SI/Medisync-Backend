import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { ArticleCategory } from '../domain/article-category';
import { ApiFilterProperty } from 'src/utils/decorators/filter-property';

export class SortArticleCategoriesDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof ArticleCategory;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FilterArticleCategoryDto {
  //Search by name
  @ApiFilterProperty({ description: 'Search by name' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class FindAllArticleCategoriesDto {
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
  @Transform(ObjectTransformer(SortArticleCategoriesDto))
  @ValidateNested({ each: true })
  @Type(() => SortArticleCategoriesDto)
  sort?: SortArticleCategoriesDto[] | null;

  @ApiPropertyOptional({ type: () => FilterArticleCategoryDto })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterArticleCategoryDto))
  @ValidateNested()
  @Type(() => FilterArticleCategoryDto)
  filters?: FilterArticleCategoryDto | null;
}
