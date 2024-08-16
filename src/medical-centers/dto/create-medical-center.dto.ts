import {
  // decorators here

  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateMedicalCenterDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  municipality: string;

  @ApiProperty()
  @IsString()
  parish: string;

  @ApiProperty()
  @IsString()
  local_phone: string;

  @ApiProperty()
  @IsString()
  mobile_phone: string;

  @ApiProperty()
  @IsString()
  mission: string;

  @ApiProperty()
  @IsString()
  vision: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
