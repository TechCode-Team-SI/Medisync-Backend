import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInstallationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  step: number;
}
