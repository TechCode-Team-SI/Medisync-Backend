import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsArray, IsNotEmpty } from 'class-validator';
import { PermissionDto } from 'src/permissions/dto/permission.dto';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: PermissionDto })
  @IsArray()
  @Type(() => PermissionDto)
  permissions: PermissionDto[];
}
