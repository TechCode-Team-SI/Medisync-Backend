import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { Symptom } from '../domain/symptom';

export class SortSymptomsDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Symptom;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FindAllSymptomsDto {
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
  @Transform(ObjectTransformer(SortSymptomsDto))
  @ValidateNested({ each: true })
  @Type(() => SortSymptomsDto)
  sort?: SortSymptomsDto[] | null;
}
