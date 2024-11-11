import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { EmployeeProfileIdDto } from 'src/employee-profiles/dto/employee-profile-id.dto';
import { RequestTemplateDto } from 'src/request-templates/dto/request-template.dto';
import { SpecialtyDto } from 'src/specialties/dto/specialty.dto';
import { UserPatientIdDto } from 'src/user-patients/dto/user-patient-id.dto';
import { IsHourFormat } from 'src/utils/validators/is-hour-format';
import { RequestValueDto } from './request-value.dto';

export class CreateRequestDto {
  @ApiProperty({ type: () => UserPatientIdDto })
  @IsNotEmpty()
  @Type(() => UserPatientIdDto)
  madeFor: UserPatientIdDto;

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
