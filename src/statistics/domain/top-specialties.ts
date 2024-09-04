import { ApiProperty } from '@nestjs/swagger';

export class TopSpecialties {
  @ApiProperty({
    type: String,
  })
  specialtyId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  requests: number;
}
