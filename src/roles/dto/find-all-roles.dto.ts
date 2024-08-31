import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Role } from '../domain/role';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';

export class SortRoleDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Role;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FindAllRolesDto {
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
  @Transform(ObjectTransformer(SortRoleDto))
  @ValidateNested({ each: true })
  @Type(() => SortRoleDto)
  sort?: SortRoleDto[] | null;
}
