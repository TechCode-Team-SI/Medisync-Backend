import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Request } from 'src/requests/domain/request';
import { Specialty } from 'src/specialties/domain/specialty';

export class CreateInstructionsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  request: Request;

  @ApiProperty()
  @IsNotEmpty()
  specialty: Specialty;
}
