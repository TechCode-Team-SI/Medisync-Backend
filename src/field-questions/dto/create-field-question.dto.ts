import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { FieldQuestionTypeEnum } from '../field-questions.enum';

export class CreateFieldQuestionDto {
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
  type: FieldQuestionTypeEnum;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isRequired: boolean;
}
