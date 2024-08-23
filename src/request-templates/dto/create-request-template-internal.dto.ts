import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RequestTemplateFieldDto } from './request-template-field.dto';
import { Type } from 'class-transformer';

export class CreateRequestTemplateInternalDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ type: RequestTemplateFieldDto })
  @IsNotEmpty()
  @Type(() => RequestTemplateFieldDto)
  fields: RequestTemplateFieldDto[];
}
