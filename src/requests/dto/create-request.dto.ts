import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { EmployeeProfileIdDto } from 'src/employee-profiles/dto/employee-profile-id.dto';
import { genderEnum } from 'src/employee-profiles/employee-profiles.enum';
import { RequestTemplateDto } from 'src/request-templates/dto/request-template.dto';
import { SpecialtyDto } from 'src/specialties/dto/specialty.dto';
import { IsHourFormat } from 'src/utils/validators/is-hour-format';
import { RequestValueDto } from './request-value.dto';

export class CreateRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  patientFullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  patientDNI: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  patientAddress?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(genderEnum)
  patientGender: genderEnum;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  patientBirthday: Date;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsHourFormat)
  appointmentHour: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  appointmentDate: Date;

  @ApiProperty({ type: RequestTemplateDto })
  @IsNotEmpty()
  @Type(() => RequestTemplateDto)
  requestTemplate: RequestTemplateDto;

  @ApiProperty({ type: EmployeeProfileIdDto })
  @IsOptional()
  @Type(() => EmployeeProfileIdDto)
  requestedMedic?: EmployeeProfileIdDto;

  @ApiProperty({ type: SpecialtyDto })
  @IsNotEmpty()
  @Type(() => SpecialtyDto)
  requestedSpecialty: SpecialtyDto;

  @ApiProperty({ type: () => RequestValueDto })
  @IsNotEmpty()
  requestValues: RequestValueDto[];
}
