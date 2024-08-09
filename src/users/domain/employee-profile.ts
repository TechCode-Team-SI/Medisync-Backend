import { ApiProperty } from '@nestjs/swagger';
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
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
