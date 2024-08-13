import { ApiProperty } from '@nestjs/swagger';

export class Installation {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  step: number;
}
