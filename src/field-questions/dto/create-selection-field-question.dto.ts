import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { SelectionConfigurationDto } from './selection-configuration.dto';
import { SelectionDto } from './selection.dto';
import { SystemPrefixNotAllowed } from 'src/utils/validators/system-prefix-not-allowed';

export class CreateSelectionFieldQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Validate(SystemPrefixNotAllowed)
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
  @IsBoolean()
  isRequired: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => SelectionConfigurationDto)
  selectionConfig: SelectionConfigurationDto;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => SelectionDto)
  selections: SelectionDto[];
}
