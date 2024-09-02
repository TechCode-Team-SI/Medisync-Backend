import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RequestTemplate } from 'src/request-templates/domain/request-template';
import { Specialty } from 'src/specialties/domain/specialty';
import { User } from 'src/users/domain/user';
import { RequestStatusEnum } from '../requests.enum';
import { RequestValue } from './request-value';
import { Rating } from 'src/ratings/domain/rating';

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
  madeBy: User;

  @ApiProperty({ type: () => User })
  requestedMedic: User;

  @ApiProperty({ type: () => Specialty })
  requestedSpecialty: Specialty;

  @ApiProperty({ type: () => RequestTemplate })
  requestTemplate: RequestTemplate;

  @ApiProperty({ type: () => RequestValue })
  requestValues: RequestValue[];

  @ApiProperty({ type: () => Rating })
  rating: Rating;

  @ApiPropertyOptional({ type: () => User })
  referredBy?: User;

  @ApiPropertyOptional()
  referredContent?: string;

  @ApiProperty()
  appointmentHour: string;

  @ApiProperty()
  status: RequestStatusEnum;

  @ApiProperty()
  createdAt: Date;
}
