import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { SpecialtyDto } from 'src/specialties/dto/specialty.dto';
import { EmployeeProfileIdDto } from 'src/employee-profiles/dto/employee-profile-id.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @ApiPropertyOptional()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  address: string;

  @ApiPropertyOptional({ type: () => SpecialtyDto })
  @IsOptional()
  @Type(() => SpecialtyDto)
  specialty?: SpecialtyDto | null;

  @ApiPropertyOptional({ type: () => EmployeeProfileIdDto })
  @IsOptional()
  @Type(() => EmployeeProfileIdDto)
  employeeProfile?: EmployeeProfileIdDto | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isDisabled: boolean;
}
