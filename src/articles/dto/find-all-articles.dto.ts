import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { Article } from '../domain/article';

export class SortArticleDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Article;

  @ApiProperty()
  @IsString()
  order: string;
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

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(ObjectTransformer(SortArticleDto))
  @ValidateNested({ each: true })
  @Type(() => SortArticleDto)
  sort?: SortArticleDto[] | null;
}
