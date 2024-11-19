import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { StatisticsTimeUnitEnum } from '../statistics-time-unit.enum';

export class StatisticsDateDto {
  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  from?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  to?: string;

  @ApiPropertyOptional()
  @IsEnum(StatisticsTimeUnitEnum)
  @IsOptional()
  grouping?: StatisticsTimeUnitEnum;
}
