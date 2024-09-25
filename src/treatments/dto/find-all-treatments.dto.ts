import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { treatment } from '../domain/treatment';

export class SorttreatmentsDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof treatment;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FindAlltreatmentsDto {
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
  @Transform(ObjectTransformer(SorttreatmentsDto))
  @ValidateNested({ each: true })
  @Type(() => SorttreatmentsDto)
  sort?: SorttreatmentsDto[] | null;
}
