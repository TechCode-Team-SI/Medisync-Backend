import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicalCenterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  instagramName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  twitterName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  facebookName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tiktokName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  municipality: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  parish: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  localPhone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mobilePhone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mission: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vision: string;
}
