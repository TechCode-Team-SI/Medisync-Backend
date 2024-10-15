import { ApiPropertyOptional } from '@nestjs/swagger';
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
import { OrderEnum } from 'src/common/order.enum';
import { ApiFilterProperty } from 'src/utils/decorators/filter-property';
import { ApiSortProperty } from 'src/utils/decorators/sort-property';
import { BooleanTransformer } from 'src/utils/transformers/boolean.transformer';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';

export class FilterUserDto {
  @ApiFilterProperty({
    isArray: true,
    type: String,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roleIds?: string[] | null;

  @ApiFilterProperty({
    isArray: true,
    type: String,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissionSlugs?: string[] | null;

  @ApiFilterProperty({
    isArray: true,
    type: String,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specialtyIds?: string[] | null;

  @ApiFilterProperty({ type: Boolean })
  @IsOptional()
  @Transform(BooleanTransformer)
  @IsBoolean()
  onlyEmployee?: boolean;

  @ApiFilterProperty({ type: Boolean })
  @IsOptional()
  @Transform(BooleanTransformer)
  @IsBoolean()
  status?: boolean;

  //Search by name
  @ApiFilterProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  search?: string;
}

export class SortUserDto {
  @ApiSortProperty({
    enum: ['createdAt', 'fullName', 'email'],
  })
  @IsString()
  orderBy: 'createdAt' | 'fullName' | 'email';

  @ApiSortProperty({ enum: OrderEnum })
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

  @ApiPropertyOptional({ type: FilterUserDto })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterUserDto))
  @ValidateNested()
  @Type(() => FilterUserDto)
  filters?: FilterUserDto | null;

  @ApiPropertyOptional({ type: SortUserDto, isArray: true })
  @IsOptional()
  @Transform(ObjectTransformer(SortUserDto))
  @ValidateNested({ each: true })
  @Type(() => SortUserDto)
  sort?: SortUserDto[] | null;
}
