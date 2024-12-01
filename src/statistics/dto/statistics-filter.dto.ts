import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsDateString, IsString } from 'class-validator';
import { StatisticsTimeUnitEnum } from '../statistics-time-unit.enum';
import { genderEnum } from 'src/employee-profiles/employee-profiles.enum';

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

  @ApiPropertyOptional()
  @IsEnum(genderEnum)
  @IsOptional()
  gender?: genderEnum;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ageFrom?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ageTo?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  filterByMe?: string;
}
