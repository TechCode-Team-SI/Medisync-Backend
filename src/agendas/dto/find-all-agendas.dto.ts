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
import { Agenda } from '../domain/agenda';

export class SortAgendasDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Agenda;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FilterAgendaDto {
  //Search by name
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}

export class FindAllAgendasDto {
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
  @Transform(ObjectTransformer(SortAgendasDto))
  @ValidateNested({ each: true })
  @Type(() => SortAgendasDto)
  sort?: SortAgendasDto[] | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(FilterAgendaDto))
  @ValidateNested()
  @Type(() => FilterAgendaDto)
  filters?: FilterAgendaDto | null;
}
