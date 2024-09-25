import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsWeekdayFormat } from 'src/utils/validators/is-weekday-format';

export class CreateAgendaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Validate(IsWeekdayFormat)
  weekdays: string;
}
