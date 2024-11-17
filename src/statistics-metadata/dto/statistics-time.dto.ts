import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { StatisticsTimeEnum } from 'src/statistics/statistics-time.enum';

export class StatisticsTimeDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  from?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  to?: string;

  @ApiPropertyOptional()
  @IsEnum(StatisticsTimeEnum)
  @IsOptional()
  time?: StatisticsTimeEnum;
}
