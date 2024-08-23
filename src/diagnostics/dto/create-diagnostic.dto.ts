import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Specialty } from 'src/specialties/domain/specialty';
import { Request } from 'src/requests/domain/request';

export class CreateDiagnosticDto {
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
