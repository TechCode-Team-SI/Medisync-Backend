import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestIdDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
