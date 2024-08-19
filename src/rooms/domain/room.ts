import { ApiProperty } from '@nestjs/swagger';

export class Room {
  @ApiProperty()
  address: string;

  @ApiProperty()
  name: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
