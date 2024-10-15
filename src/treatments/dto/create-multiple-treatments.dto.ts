import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { CreatetreatmentDto } from './create-treatment.dto';

export class CreateMultipleTreatmentsDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CreatetreatmentDto)
  treatments: CreatetreatmentDto[];
}
