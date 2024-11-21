import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { CreateDaysOffDto } from 'src/days-offs/dto/create-days-off.dto';
import { IsHourFormat } from 'src/utils/validators/is-hour-format';
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Validate(IsHourFormat)
  from: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Validate(IsHourFormat)
  to: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  slotTime?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDaysOffDto)
  daysOffs?: CreateDaysOffDto[] | null;
}
