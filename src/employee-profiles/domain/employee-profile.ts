import { ApiProperty } from '@nestjs/swagger';
import { Agenda } from 'src/agendas/domain/agenda';
import { Schedule } from 'src/schedules/domain/schedule';
import { Specialty } from 'src/specialties/domain/specialty';
import { genderEnum } from '../employee-profiles.enum';

export class EmployeeProfile {
  @ApiProperty()
  MPPS: string;

  @ApiProperty()
  CML: string;

  @ApiProperty()
  gender: genderEnum;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  dni: string;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  address: string;

  @ApiProperty()
  specialties?: Specialty[] | null;

  @ApiProperty()
  schedule?: Schedule | null;

  @ApiProperty()
  agenda?: Agenda | null;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
