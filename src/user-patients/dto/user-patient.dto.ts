import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { genderEnum } from 'src/employee-profiles/employee-profiles.enum';

export class UserPatientDto {
  @ApiProperty({ example: 'Fernando', type: String })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'F', type: String })
  @IsNotEmpty()
  @IsEnum(genderEnum)
  gender: genderEnum;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  birthday: Date;
}
