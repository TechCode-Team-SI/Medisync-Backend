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

export class FilterUserPatientsDto {
  //Search by name
  @ApiFilterProperty({ description: 'Search by name' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiFilterProperty()
  @IsOptional()
  @IsString()
  userId?: string;
}

export class SortUserPatientsDto {
  @ApiSortProperty({ enum: ['createdAt', 'birthday', 'fullName', 'dni'] })
  @Type(() => String)
  @IsString()
  orderBy: string;

  @ApiSortProperty({ enum: OrderEnum })
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

  @ApiPropertyOptional({ type: () => SortUserPatientsDto, isArray: true })
  @IsOptional()
  @Transform(ObjectTransformer(SortUserPatientsDto))
  @ValidateNested({ each: true })
  @Type(() => SortUserPatientsDto)
  sort?: SortUserPatientsDto[] | null;

  @ApiPropertyOptional({ type: () => FilterUserPatientsDto })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterUserPatientsDto))
  @ValidateNested({ each: true })
  @Type(() => FilterUserPatientsDto)
  filters?: FilterUserPatientsDto | null;
}
