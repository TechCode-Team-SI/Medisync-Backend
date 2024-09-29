import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { SpecialtyDto } from 'src/specialties/dto/specialty.dto';

export class EmployeeProfileDto {
  @ApiProperty({ example: '27317962', type: String })
  @IsNotEmpty()
  dni: string;

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
