import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/domain/role';

export class Permission {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  roles: Role[];
}
