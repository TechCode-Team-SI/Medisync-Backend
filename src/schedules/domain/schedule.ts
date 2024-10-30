import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EmployeeProfile } from 'src/employee-profiles/domain/employee-profile';

export class Schedule {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;

  @ApiProperty()
  slotTime: number;

  @ApiPropertyOptional({
    type: () => EmployeeProfile,
  })
  employees?: EmployeeProfile[] | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
