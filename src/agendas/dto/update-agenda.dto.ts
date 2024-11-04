// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { DaysOffDto } from 'src/days-offs/dto/days-off.dto';
import { CreateAgendaDto } from './create-agenda.dto';

export class UpdateAgendaDto extends PartialType(CreateAgendaDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DaysOffDto)
  daysOffs?: DaysOffDto[] | null;
}
