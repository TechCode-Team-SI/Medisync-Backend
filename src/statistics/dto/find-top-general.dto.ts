import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { StatisticsTimeEnum } from 'src/statistics/statistics-time.enum';

export class FindTopGeneralDto {
  @ApiPropertyOptional()
  @IsEnum(StatisticsTimeEnum)
  @IsOptional()
  time?: StatisticsTimeEnum;
}
