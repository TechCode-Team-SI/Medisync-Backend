import { ApiProperty } from '@nestjs/swagger';

export class TopGeneric {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  requests: number;
}
