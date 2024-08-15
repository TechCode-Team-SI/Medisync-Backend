import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsPartOfArray } from 'src/utils/validators/is-part-of-array';
import { FieldQuestionTypeEnum } from '../field-questions.enum';

export class CreateTextfieldFieldQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(FieldQuestionTypeEnum)
  @Validate(IsPartOfArray, [
    FieldQuestionTypeEnum.TEXT,
    FieldQuestionTypeEnum.NUMBER,
  ])
  type: FieldQuestionTypeEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isRequired: boolean;
}
