import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestTemplateDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
