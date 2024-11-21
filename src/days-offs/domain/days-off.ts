import { ApiProperty } from '@nestjs/swagger';
import { Agenda } from 'src/agendas/domain/agenda';
import { EmployeeProfile } from 'src/employee-profiles/domain/employee-profile';
import { Specialty } from 'src/specialties/domain/specialty';

export class DaysOff {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  from: Date;

  @ApiProperty()
  to: Date;

  @ApiProperty()
  agenda?: Agenda;

  @ApiProperty()
  employeeProfile?: EmployeeProfile;

  @ApiProperty()
  specialty?: Specialty;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
