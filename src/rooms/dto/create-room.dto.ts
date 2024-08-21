import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SpecialtyDto } from 'src/specialties/dto/specialty.dto';
import { EmployeeProfileDto } from 'src/users/dto/employee-profile.dto';

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

  @ApiPropertyOptional({ type: () => EmployeeProfileDto })
  @IsOptional()
  @Type(() => EmployeeProfileDto)
  employeeProfile?: EmployeeProfileDto | null;
}
