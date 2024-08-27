import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FileType } from 'src/files/domain/file';
import { RequestTemplate } from 'src/request-templates/domain/request-template';
import { EmployeeProfile } from 'src/employee-profiles/domain/employee-profile';

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

  @ApiProperty({ type: () => EmployeeProfile })
  employees?: EmployeeProfile[] | null;

  @ApiPropertyOptional({ type: RequestTemplate })
  requestTemplate?: RequestTemplate | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
