import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { FieldQuestionTypeEnum } from '../field-questions.enum';
import { FieldQuestion } from '../domain/field-question';

export class SortFieldQuestionDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof FieldQuestion;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FilterFieldQuestionDto {
  //Search by name
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ type: FieldQuestionTypeEnum })
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

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterFieldQuestionDto))
  @ValidateNested()
  @Type(() => FilterFieldQuestionDto)
  filters?: FilterFieldQuestionDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(ObjectTransformer(SortFieldQuestionDto))
  @ValidateNested({ each: true })
  @Type(() => SortFieldQuestionDto)
  sort?: SortFieldQuestionDto[] | null;
}
