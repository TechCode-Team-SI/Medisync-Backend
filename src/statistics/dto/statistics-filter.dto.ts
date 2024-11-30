import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsDateString, IsString } from 'class-validator';
import { StatisticsTimeUnitEnum } from '../statistics-time-unit.enum';

export class StatisticsFilterDto {
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

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  specialtyId?: string;
}
