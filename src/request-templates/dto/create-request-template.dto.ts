import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { RequestTemplateFieldDto } from './request-template-field.dto';
import { Type } from 'class-transformer';
import { SystemPrefixNotAllowed } from 'src/utils/validators/system-prefix-not-allowed';

export class CreateRequestTemplateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Validate(SystemPrefixNotAllowed)
  name: string;

  @ApiProperty({ type: RequestTemplateFieldDto })
  @IsNotEmpty()
  @Type(() => RequestTemplateFieldDto)
  fields: RequestTemplateFieldDto[];
}
