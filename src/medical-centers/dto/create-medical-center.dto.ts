import { IsString, IsEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicalCenterDto {
  @ApiProperty()
  @IsEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsEmpty()
  @IsString()
  municipality: string;

  @ApiProperty()
  @IsEmpty()
  @IsString()
  parish: string;

  @ApiProperty()
  @IsEmpty()
  @IsString()
  local_phone: string;

  @ApiProperty()
  @IsEmpty()
  @IsString()
  mobile_phone: string;

  @ApiProperty()
  @IsEmpty()
  @IsString()
  mission: string;

  @ApiProperty()
  @IsEmpty()
  @IsString()
  vision: string;
}
