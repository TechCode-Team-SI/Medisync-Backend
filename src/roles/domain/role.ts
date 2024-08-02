import { ApiProperty } from '@nestjs/swagger';
import { Permission } from 'src/permissions/domain/permission';

export class Role {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  permissions?: Permission[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
