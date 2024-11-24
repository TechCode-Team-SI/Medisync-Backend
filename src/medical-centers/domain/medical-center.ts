import { ApiProperty } from '@nestjs/swagger';

export class MedicalCenter {
  @ApiProperty()
  description: string;

  @ApiProperty()
  instagramName: string;

  @ApiProperty()
  twitterName: string;

  @ApiProperty()
  facebookName: string;

  @ApiProperty()
  tiktokName: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  municipality: string;

  @ApiProperty()
  parish: string;

  @ApiProperty()
  localPhone: string;

  @ApiProperty()
  mobilePhone: string;

  @ApiProperty()
  mission: string;

  @ApiProperty()
  vision: string;
}
