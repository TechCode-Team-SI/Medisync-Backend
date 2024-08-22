import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { SpecialtyDto } from 'src/specialties/dto/specialty.dto';

export class EmployeeProfileDto {
  @ApiProperty({ example: '27317962', type: String })
  @IsNotEmpty()
  dni?: string;

  @ApiProperty()
  @IsNotEmpty()
  birthday?: string;

  @ApiProperty({ example: 'Av Lisandro Alvarado', type: String })
  @IsNotEmpty()
  address?: string;

  @ApiPropertyOptional({ type: SpecialtyDto })
  @IsOptional()
  @Type(() => SpecialtyDto)
  specialties?: SpecialtyDto[] | null;
}
