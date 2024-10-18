import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { EmployeeProfileIdDto } from 'src/employee-profiles/dto/employee-profile-id.dto';
import { RequestTemplateDto } from 'src/request-templates/dto/request-template.dto';
import { SpecialtyDto } from 'src/specialties/dto/specialty.dto';
import { IsHourFormat } from 'src/utils/validators/is-hour-format';
import { RequestValueDto } from './request-value.dto';
import { UserPatientIdDto } from 'src/user-patients/dto/user-patient-id.dto';
import { Type } from 'class-transformer';

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
  @Type(() => RequestTemplateDto)
  requestTemplate: RequestTemplateDto;

  @ApiProperty({ type: EmployeeProfileIdDto })
  @IsNotEmpty()
  @Type(() => EmployeeProfileIdDto)
  requestedMedic: EmployeeProfileIdDto;

  @ApiProperty({ type: SpecialtyDto })
  @IsNotEmpty()
  @Type(() => SpecialtyDto)
  requestedSpecialty: SpecialtyDto;

  @ApiProperty({ type: () => RequestValueDto })
  @IsNotEmpty()
  requestValues: RequestValueDto[];

  @ApiProperty({ type: () => UserPatientIdDto })
  @IsNotEmpty()
  @Type(() => UserPatientIdDto)
  madeFor?: UserPatientIdDto | null;
}
