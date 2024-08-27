import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EmployeeProfileIdDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
