import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindTopGeneralDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  from?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  to?: string;
}
