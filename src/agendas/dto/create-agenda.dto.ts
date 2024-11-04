import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsWeekdayFormat } from 'src/utils/validators/is-weekday-format';

export class CreateAgendaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.join('_');
    }
    return value;
  })
  @Validate(IsWeekdayFormat)
  weekdays: string;
}
