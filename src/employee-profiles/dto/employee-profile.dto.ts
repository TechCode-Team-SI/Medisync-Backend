import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SpecialtyDto } from 'src/specialties/dto/specialty.dto';
import { genderEnum } from '../employee-profiles.enum';

export class EmployeeProfileDto {
  @ApiProperty({ example: '27317962', type: String })
  @IsNotEmpty()
  dni: string;

  @ApiProperty({ example: '12345', type: String })
  @IsOptional()
  @IsString()
  CML: string;

  @ApiProperty({ example: '12345', type: String })
  @IsOptional()
  @IsString()
  MPPS: string;

  @ApiProperty({ example: 'F', type: String })
  @IsNotEmpty()
  @IsEnum(genderEnum)
  gender: genderEnum;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  birthday: Date;

  @ApiProperty({ example: 'Av Lisandro Alvarado', type: String })
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional({ type: SpecialtyDto })
  @IsOptional()
  @Type(() => SpecialtyDto)
  specialties?: SpecialtyDto[] | null;
}
