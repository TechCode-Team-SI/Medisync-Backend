import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FilteredByType, ChartType } from '../statistics-metadata.enum';
import { FieldQuestionDto } from 'src/field-questions/dto/field-question.dto';
import { Type } from 'class-transformer';

export class CreateStatisticsMetadataDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  label: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => FieldQuestionDto)
  fieldQuestion: FieldQuestionDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ChartType)
  type: ChartType;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(FilteredByType)
  filteredByType: FilteredByType;

  @ApiProperty()
  @IsOptional()
  @IsString()
  filter?: string;
}
