import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestSavedDataDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  alias: string;
}
