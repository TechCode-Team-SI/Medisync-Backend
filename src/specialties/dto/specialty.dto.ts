import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SpecialtyDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
