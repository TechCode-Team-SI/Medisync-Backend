import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SpecialtyDto } from 'src/specialties/dto/specialty.dto';
import { genderEnum } from '../employee-profiles.enum';
import { ScheduleDto } from 'src/schedules/dto/schedule.dto';
import { EmployeeProfileDto } from './employee-profile.dto';

export class EmployeeProfilePartialDto extends PartialType(EmployeeProfileDto) {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: '27317962', type: String })
  @IsNotEmpty()
  dni: string;

  @ApiProperty({ example: '12345', type: String })
  @IsOptional()
  @IsString()
  CML: string;

  @ApiProperty({ example: '12345', type: String })
  @IsOptional()
  @IsString()
  MPPS: string;

  @ApiProperty({ example: 'F', type: String })
  @IsNotEmpty()
  @IsEnum(genderEnum)
  gender: genderEnum;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  birthday: Date;

  @ApiProperty({ example: 'Av Lisandro Alvarado', type: String })
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional({ type: SpecialtyDto })
  @IsOptional()
  @Type(() => SpecialtyDto)
  specialties?: SpecialtyDto[] | null;

  @ApiPropertyOptional({ type: ScheduleDto })
  @IsOptional()
  @Type(() => ScheduleDto)
  schedule?: ScheduleDto;
}
