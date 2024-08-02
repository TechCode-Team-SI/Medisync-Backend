import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SuccessResponseDto {
  @ApiProperty({ example: true })
  @IsNotEmpty()
  success: boolean;
}
