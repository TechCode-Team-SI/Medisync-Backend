import { ApiProperty } from '@nestjs/swagger';

export class EmployeeProfile {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  dni: string;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  address: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
