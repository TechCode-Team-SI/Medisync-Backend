import { ApiProperty } from '@nestjs/swagger';
import { Specialty } from 'src/specialties/domain/specialty';
import { User } from 'src/users/domain/user';
import { Request } from 'src/requests/domain/request';

export class Diagnostic {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: User })
  madeBy: User;

  @ApiProperty({ type: Request })
  request: Request;

  @ApiProperty({ type: Specialty })
  specialty: Specialty;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
