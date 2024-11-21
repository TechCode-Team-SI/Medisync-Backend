import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderEnum } from 'src/common/order.enum';
import { ApiFilterProperty } from 'src/utils/decorators/filter-property';
import { ApiSortProperty } from 'src/utils/decorators/sort-property';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';

export class SortIllnessesDto {
  @ApiSortProperty({ enum: ['name', 'createdAt'] })
  @Type(() => String)
  @IsString()
  orderBy: string;

  @ApiSortProperty({ enum: OrderEnum })
  @IsString()
  order: string;
}

export class FilterIllnessesDto {
  //Search by name
  @ApiFilterProperty({ description: 'Search by name' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class FindAllIllnessesDto {
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

  @ApiPropertyOptional({ type: () => SortIllnessesDto, isArray: true })
  @IsOptional()
  @Transform(ObjectTransformer(SortIllnessesDto))
  @ValidateNested({ each: true })
  @Type(() => SortIllnessesDto)
  sort?: SortIllnessesDto[] | null;

  @ApiPropertyOptional({ type: () => FilterIllnessesDto })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterIllnessesDto))
  @ValidateNested()
  @Type(() => FilterIllnessesDto)
  filters?: FilterIllnessesDto | null;
}
