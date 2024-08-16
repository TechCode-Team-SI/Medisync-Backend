import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RequestTemplateFieldDto } from './request-template-field.dto';
import { Type } from 'class-transformer';

export class CreateRequestTemplateDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: RequestTemplateFieldDto })
  @IsNotEmpty()
  @Type(() => RequestTemplateFieldDto)
  fields: RequestTemplateFieldDto[];
}
