import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FinishRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  diagnostic: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  instructions: string;
}
