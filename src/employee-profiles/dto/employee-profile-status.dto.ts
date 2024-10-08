import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class EmployeeProfileStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Boolean)
  @IsBoolean()
  status: boolean;
}
