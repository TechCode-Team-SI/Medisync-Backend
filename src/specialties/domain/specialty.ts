import { ApiProperty } from '@nestjs/swagger';
import { FileType } from 'src/files/domain/file';
import { EmployeeProfile } from 'src/users/domain/employee-profile';

export class Specialty {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    type: () => FileType,
  })
  image?: FileType | null;

  @ApiProperty()
  isGroup: boolean;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty()
  isDisabled: boolean;

  @ApiProperty()
  employees?: EmployeeProfile[] | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
