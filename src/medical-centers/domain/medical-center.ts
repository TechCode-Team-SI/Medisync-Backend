import { ApiProperty } from '@nestjs/swagger';

export class MedicalCenter {
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
