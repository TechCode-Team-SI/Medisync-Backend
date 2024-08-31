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
import { Permission } from '../domain/permission';

export class SortPermissionDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Permission;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FilterPermissionDto {
  //Search by name
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}

export class FindAllpermissionsDto {
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
  @Transform(ObjectTransformer(FilterPermissionDto))
  @ValidateNested()
  @Type(() => FilterPermissionDto)
  filters?: FilterPermissionDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(ObjectTransformer(SortPermissionDto))
  @ValidateNested({ each: true })
  @Type(() => SortPermissionDto)
  sort?: SortPermissionDto[] | null;
}
