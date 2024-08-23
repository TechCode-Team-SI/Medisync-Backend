import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { CreateSpecialtyInternalDto } from './create-specialty-internal.dto';

export class CreateMultipleSpecialtyInternalDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CreateSpecialtyInternalDto)
  specialties: CreateSpecialtyInternalDto[];
}
