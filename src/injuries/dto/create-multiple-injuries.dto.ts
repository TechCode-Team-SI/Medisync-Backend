import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { CreateInjuryDto } from './create-injury.dto';

export class CreateMultipleInjuriesDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CreateInjuryDto)
  injuries: CreateInjuryDto[];
}
