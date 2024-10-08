import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BooleanTransformer } from 'src/utils/transformers/boolean.transformer';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { User } from '../domain/user';

export class FilterUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roleIds?: string[] | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissionSlugs?: string[] | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specialtyIds?: string[] | null;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(BooleanTransformer)
  @IsBoolean()
  onlyEmployee?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(BooleanTransformer)
  @IsBoolean()
  status?: boolean;

  //Search by name
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}

export class SortUserDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof User;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryUserDto {
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
  @IsObject()
  @Transform(ObjectTransformer(FilterUserDto))
  @ValidateNested()
  @Type(() => FilterUserDto)
  filters?: FilterUserDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(ObjectTransformer(SortUserDto))
  @ValidateNested({ each: true })
  @Type(() => SortUserDto)
  sort?: SortUserDto[] | null;
}
