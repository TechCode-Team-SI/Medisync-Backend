import { ApiProperty } from '@nestjs/swagger';
import { Permission } from 'src/permissions/domain/permission';

export class Role {
  @ApiProperty()
  slug: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  permissions?: Permission[];

  @ApiProperty()
  isMutable?: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
