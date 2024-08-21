import { ApiProperty } from '@nestjs/swagger';
import { RequestTemplate } from 'src/request-templates/domain/request-template';
import { Specialty } from 'src/specialties/domain/specialty';
import { User } from 'src/users/domain/user';
import { RequestStatusEnum } from '../requests.enum';
import { RequestValue } from './request-value';

export class Request {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  patientFullName: string;

  @ApiProperty()
  patientDNI: string;

  @ApiProperty()
  patientAddress: string;

  @ApiProperty({ type: () => User })
  requestedMedic: User;

  @ApiProperty({ type: () => Specialty })
  requestedSpecialty: Specialty;

  @ApiProperty({ type: () => RequestTemplate })
  requestTemplate: RequestTemplate;

  @ApiProperty({ type: () => RequestValue })
  requestValues: RequestValue[];

  @ApiProperty()
  appointmentHour: string;

  @ApiProperty()
  status: RequestStatusEnum;

  @ApiProperty()
  createdAt: Date;
}
