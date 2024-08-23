import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { SelectionConfigurationDto } from './selection-configuration.dto';
import { SelectionDto } from './selection.dto';
import { IsPartOfArray } from 'src/utils/validators/is-part-of-array';
import { FieldQuestionTypeEnum } from '../field-questions.enum';

export class CreateGeneralFieldQuestionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isRequired: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(FieldQuestionTypeEnum)
  @Validate(IsPartOfArray, [
    FieldQuestionTypeEnum.TEXT,
    FieldQuestionTypeEnum.NUMBER,
  ])
  type: FieldQuestionTypeEnum;

  @ApiPropertyOptional()
  @Type(() => SelectionConfigurationDto)
  selectionConfig?: SelectionConfigurationDto;

  @ApiPropertyOptional()
  @Type(() => SelectionDto)
  selections?: SelectionDto[];
}
