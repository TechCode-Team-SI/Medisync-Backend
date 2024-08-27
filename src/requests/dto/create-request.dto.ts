import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { RequestTemplateDto } from 'src/request-templates/dto/request-template.dto';
import { SpecialtyDto } from 'src/specialties/dto/specialty.dto';
import { EmployeeProfileIdDto } from 'src/employee-profiles/dto/employee-profile-id.dto';
import { RequestValueDto } from './request-value.dto';
import { IsHourFormat } from 'src/utils/validators/is-hour-format';

export class CreateRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  patientFullName: string;

  @ApiProperty()
  @IsNotEmpty()
  patientDNI: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  patientAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsHourFormat)
  appointmentHour: string;

  @ApiProperty({ type: RequestTemplateDto })
  @IsNotEmpty()
  requestTemplate: RequestTemplateDto;

  @ApiProperty({ type: EmployeeProfileIdDto })
  @IsNotEmpty()
  requestedMedic: EmployeeProfileIdDto;

  @ApiProperty({ type: SpecialtyDto })
  @IsNotEmpty()
  requestedSpecialty: SpecialtyDto;

  @ApiProperty({ type: () => RequestValueDto })
  @IsNotEmpty()
  requestValues: RequestValueDto[];
}
