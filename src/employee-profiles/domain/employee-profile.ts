import { ApiProperty } from '@nestjs/swagger';
import { Agenda } from 'src/agendas/domain/agenda';
import { Specialty } from 'src/specialties/domain/specialty';

export class EmployeeProfile {
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
  agenda?: Agenda | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
