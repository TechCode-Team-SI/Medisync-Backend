import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { FileDto } from 'src/files/dto/file.dto';
import { RequestTemplateDto } from 'src/request-templates/dto/request-template.dto';

export class CreateSpecialtyDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isGroup?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isDisabled?: boolean;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  image?: FileDto | null;

  @ApiPropertyOptional({ type: () => RequestTemplateDto })
  @IsOptional()
  requestTemplate?: RequestTemplateDto | null;
}
