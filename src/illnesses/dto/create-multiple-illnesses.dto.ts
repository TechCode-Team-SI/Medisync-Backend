import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { CreateIllnessDto } from './create-illness.dto';

export class CreateMultipleIllnessesDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CreateIllnessDto)
  illnesses: CreateIllnessDto[];
}
