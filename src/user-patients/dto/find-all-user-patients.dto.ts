import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { UserPatient } from '../domain/user-patient';

export class FilterUserPatientsDto {
  //Search by name
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId?: string;
}

export class SortUserPatientsDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof UserPatient;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FindAllUserPatientsDto {
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
  @Transform(ObjectTransformer(SortUserPatientsDto))
  @ValidateNested({ each: true })
  @Type(() => SortUserPatientsDto)
  sort?: SortUserPatientsDto[] | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterUserPatientsDto))
  @ValidateNested({ each: true })
  @Type(() => FilterUserPatientsDto)
  filters?: FilterUserPatientsDto | null;
}
