import { ApiProperty } from '@nestjs/swagger';
import { DaysOff } from 'src/days-offs/domain/days-off';

export class Agenda {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  weekdays: string[];

  @ApiProperty()
  daysOffs?: DaysOff[] | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
