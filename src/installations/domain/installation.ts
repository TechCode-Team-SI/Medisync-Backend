import { ApiProperty } from '@nestjs/swagger';

export class Installation {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty()
  step: number;
}
