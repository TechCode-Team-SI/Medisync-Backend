import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  injuries: string[];

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  symptoms: string[];

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  treatments: string[];

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  pathologies: string[];
}
