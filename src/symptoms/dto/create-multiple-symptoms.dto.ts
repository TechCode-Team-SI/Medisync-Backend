import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { CreateSymptomDto } from './create-symptom.dto';

export class CreateMultipleSymptomsDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CreateSymptomDto)
  symptoms: CreateSymptomDto[];
}
