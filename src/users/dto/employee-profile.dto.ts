import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EmployeeProfileDto {
  @ApiProperty({ example: '27317962', type: String })
  @IsNotEmpty()
  dni?: string;

  @ApiProperty()
  @IsNotEmpty()
  birthday?: string;

  @ApiProperty({ example: 'Av Lisandro Alvarado', type: String })
  @IsNotEmpty()
  address?: string;
}
