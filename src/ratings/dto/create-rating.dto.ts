import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  review: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stars: number;
}
