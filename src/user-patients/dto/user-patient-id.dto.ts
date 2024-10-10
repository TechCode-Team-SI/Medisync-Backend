import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserPatientIdDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
