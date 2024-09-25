import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { Pathology } from '../domain/pathology';

export class SortPathologiesDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Pathology;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FindAllPathologiesDto {
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
  @Transform(ObjectTransformer(SortPathologiesDto))
  @ValidateNested({ each: true })
  @Type(() => SortPathologiesDto)
  sort?: SortPathologiesDto[] | null;
}
