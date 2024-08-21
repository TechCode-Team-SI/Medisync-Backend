import { ApiProperty } from '@nestjs/swagger';
import { Specialty } from 'src/specialties/domain/specialty';
import { EmployeeProfile } from 'src/users/domain/employee-profile';

export class Room {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty({
    type: () => Specialty,
  })
  specialty?: Specialty | null;

  @ApiProperty({
    type: () => EmployeeProfile,
  })
  employeeProfile?: EmployeeProfile | null;
}
