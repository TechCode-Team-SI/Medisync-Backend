import { ApiProperty } from '@nestjs/swagger';

export class TopMedics {
  @ApiProperty({
    type: String,
  })
  medicId: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  requests: number;
}
