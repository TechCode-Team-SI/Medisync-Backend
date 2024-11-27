import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';
import { EmployeeProfileDto } from 'src/employee-profiles/dto/employee-profile.dto';

export class StepOneInstallationDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  fullName: string;

  @ApiPropertyOptional({ type: () => EmployeeProfileDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => EmployeeProfileDto)
  employeeProfile?: EmployeeProfileDto | null;
}
