import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { CreatePathologyDto } from './create-pathology.dto';

export class CreateMultiplePathologyDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CreatePathologyDto)
  pathologies: CreatePathologyDto[];
}
