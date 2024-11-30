import { ApiProperty } from '@nestjs/swagger';

export class TopGeneric {
  @ApiProperty()
  name: string;

  @ApiProperty()
  requests: number;
}
