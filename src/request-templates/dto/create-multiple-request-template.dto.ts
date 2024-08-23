import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { CreateRequestTemplateInternalDto } from './create-request-template-internal.dto';

export class CreateMultipleRequestTemplateDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CreateRequestTemplateInternalDto)
  templates: CreateRequestTemplateInternalDto[];
}
