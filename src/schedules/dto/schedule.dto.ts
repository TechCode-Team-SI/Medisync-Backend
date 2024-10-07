import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ScheduleDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
