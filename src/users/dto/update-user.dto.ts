import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { EmployeeProfilePartialDto } from 'src/employee-profiles/dto/employee-profile-partial.dto';
import { FileDto } from '../../files/dto/file.dto';
import { RoleDto } from '../../roles/dto/role.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ example: 'John Doe', type: String })
  @IsOptional()
  fullName?: string;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;

  @ApiPropertyOptional({ type: () => RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  roles?: RoleDto[] | null;

  @ApiPropertyOptional({ type: () => EmployeeProfilePartialDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => EmployeeProfilePartialDto)
  employeeProfile?: EmployeeProfilePartialDto | null;
}
