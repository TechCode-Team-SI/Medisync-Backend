import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
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

export class SortSpecialtyDto {
  @ApiSortProperty({ enum: ['createdAt', 'name'] })
  @Type(() => String)
  @IsString()
  orderBy: string;

  @ApiSortProperty({ enum: OrderEnum })
  @IsString()
  order: string;
}

export class FilterSpecialtyDto {
  //Search by name
  @ApiFilterProperty()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiFilterProperty({ type: String, isArray: true })
  @IsOptional()
  @IsString()
  employeeProfileIds?: string[] | null;

  @ApiFilterProperty({ type: Boolean })
  @IsOptional()
  @Transform(BooleanTransformer)
  @IsBoolean()
  isDisabled?: boolean | null;
}

export class FindAllSpecialtiesDto {
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

  @ApiPropertyOptional({ type: () => FilterSpecialtyDto })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterSpecialtyDto))
  @ValidateNested()
  @Type(() => FilterSpecialtyDto)
  filters?: FilterSpecialtyDto | null;

  @ApiPropertyOptional({ type: () => SortSpecialtyDto, isArray: true })
  @IsOptional()
  @Transform(ObjectTransformer(SortSpecialtyDto))
  @ValidateNested({ each: true })
  @Type(() => SortSpecialtyDto)
  sort?: SortSpecialtyDto[] | null;
}
