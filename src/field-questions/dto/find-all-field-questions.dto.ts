import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
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
import { FieldQuestionTypeEnum } from '../field-questions.enum';

export class SortFieldQuestionDto {
  @ApiSortProperty({ enum: ['createdAt', 'name', 'slug', 'label'] })
  @Type(() => String)
  @IsString()
  orderBy: string;

  @ApiSortProperty({ enum: OrderEnum })
  @IsString()
  order: string;
}

export class FilterFieldQuestionDto {
  //Search by name
  @ApiFilterProperty()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiFilterProperty({ type: String, enum: FieldQuestionTypeEnum })
  @IsOptional()
  @IsEnum(FieldQuestionTypeEnum)
  type?: FieldQuestionTypeEnum | null;
}

export class FindAllFieldQuestionsDto {
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

  @ApiPropertyOptional({ type: () => FilterFieldQuestionDto })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterFieldQuestionDto))
  @ValidateNested()
  @Type(() => FilterFieldQuestionDto)
  filters?: FilterFieldQuestionDto | null;

  @ApiPropertyOptional({ type: () => SortFieldQuestionDto, isArray: true })
  @IsOptional()
  @Transform(ObjectTransformer(SortFieldQuestionDto))
  @ValidateNested({ each: true })
  @Type(() => SortFieldQuestionDto)
  sort?: SortFieldQuestionDto[] | null;
}
