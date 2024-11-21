---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/find-all-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.dto.ts
---
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';
import { <%= name %> } from '../domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';

export class Sort<%= h.inflection.transform(name, ['pluralize']) %>Dto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof <%= name %>;

  @ApiProperty()
  @IsString()
  order: string;
}

export class FindAll<%= h.inflection.transform(name, ['pluralize']) %>Dto {
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
  @Transform(ObjectTransformer(Sort<%= h.inflection.transform(name, ['pluralize']) %>Dto))
  @ValidateNested({ each: true })
  @Type(() => Sort<%= h.inflection.transform(name, ['pluralize']) %>Dto)
  sort?: Sort<%= h.inflection.transform(name, ['pluralize']) %>Dto[] | null;
}
