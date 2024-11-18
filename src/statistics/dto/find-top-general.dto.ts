import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsDate } from 'class-validator';

export class FindTopGeneralDto {
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
}
