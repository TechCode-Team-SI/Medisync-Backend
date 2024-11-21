import { ApiProperty } from '@nestjs/swagger';

export class TopWeekdays {
  @ApiProperty()
  weekday: string;

  @ApiProperty()
  requests: number;
}
