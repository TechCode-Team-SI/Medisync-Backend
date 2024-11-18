import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsEnum } from 'class-validator';
import { StatisticsTimeEnum } from 'src/statistics/statistics-time.enum';

export class StatisticsTimeDto {
  @ApiPropertyOptional()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  from?: Date;

  @ApiPropertyOptional()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  to?: Date;

  @ApiPropertyOptional()
  @IsEnum(StatisticsTimeEnum)
  @IsOptional()
  time?: StatisticsTimeEnum;
}
