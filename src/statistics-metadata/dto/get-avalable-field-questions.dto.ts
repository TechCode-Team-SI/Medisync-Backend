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
import { FieldQuestionTypeEnum } from 'src/field-questions/field-questions.enum';
import { ApiFilterProperty } from 'src/utils/decorators/filter-property';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';

export class FilterAvailableFieldQuestions {
  @ApiFilterProperty()
  @IsOptional()
  @IsEnum(FieldQuestionTypeEnum)
  type?: FieldQuestionTypeEnum;

  //Search by name
  @ApiFilterProperty({ description: 'Search by name' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class GetAvailableFieldQuestionsDto {
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

  @ApiPropertyOptional({ type: () => FilterAvailableFieldQuestions })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterAvailableFieldQuestions))
  @ValidateNested()
  @Type(() => FilterAvailableFieldQuestions)
  filters?: FilterAvailableFieldQuestions | null;
}
