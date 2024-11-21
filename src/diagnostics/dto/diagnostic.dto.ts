import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DiagnosticDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  illnesses: string[];

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
}
