import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/domain/role';

export class PasswordToken {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  expiresAt: Date;
}
