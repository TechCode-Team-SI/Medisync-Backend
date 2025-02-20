import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  // decorators here
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  ValidateNested,
  IsString,
  IsObject,
} from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { RoleDto } from '../../roles/dto/role.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';
import { EmployeeProfileDto } from 'src/employee-profiles/dto/employee-profile.dto';
import { CreateUserPatientDto } from 'src/user-patients/dto/create-user-patient.dto';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John', type: String })
  @IsNotEmpty()
  fullName: string;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  photo?: FileDto | null;

  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  roles?: RoleDto[] | null;

  @ApiPropertyOptional({ type: () => EmployeeProfileDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => EmployeeProfileDto)
  employeeProfile?: EmployeeProfileDto | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  userPatient?: CreateUserPatientDto | null;

  @ApiProperty({ example: '0412-1234567' })
  @IsOptional()
  @IsString()
  phone?: string;
}
