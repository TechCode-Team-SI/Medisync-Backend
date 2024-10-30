import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindAllDaysOffsRangedDto {
  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  userId?: string | null;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  specialtyId?: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endDate: Date;
}
