import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { FileType } from '../../files/domain/file';
import { Role } from '../../roles/domain/role';
import { EmployeeProfile } from '../../employee-profiles/domain/employee-profile';
import { UserPatient } from 'src/user-patients/domain/user-patient';

const idType = Number;

export class User {
  @ApiProperty()
  phone?: string;

  @ApiProperty({
    type: idType,
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  email: string;

  @Exclude({ toPlainOnly: true })
  password?: string;

  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  fullName: string;

  @ApiProperty({
    type: () => FileType,
  })
  photo?: FileType | null;

  @ApiProperty({
    type: () => Role,
  })
  roles?: Role[] | null;

  @ApiProperty({
    type: () => UserPatient,
  })
  userPatients?: UserPatient[] | null;

  @ApiProperty({
    type: () => EmployeeProfile,
  })
  employeeProfile?: EmployeeProfile | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
