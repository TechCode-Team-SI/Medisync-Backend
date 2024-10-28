import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindAllDaysOffsRangedDto {
  @ApiProperty({ type: String, isArray: true })
  @IsOptional()
  @IsString()
  employeeId?: string | null;

  @ApiProperty({ type: String, isArray: true })
  @IsOptional()
  @IsString()
  agendaId?: string | null;

  @ApiProperty({ type: String, isArray: true })
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
