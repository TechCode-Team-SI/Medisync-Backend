import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SpecialtyDto } from 'src/specialties/dto/specialty.dto';
import { EmployeeProfileIdDto } from 'src/employee-profiles/dto/employee-profile-id.dto';

export class CreateRoomDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiPropertyOptional({ type: () => SpecialtyDto })
  @IsOptional()
  @Type(() => SpecialtyDto)
  specialty?: SpecialtyDto | null;

  @ApiPropertyOptional({ type: () => EmployeeProfileIdDto })
  @IsOptional()
  @Type(() => EmployeeProfileIdDto)
  employeeProfile?: EmployeeProfileIdDto | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isDisabled: boolean;
}
