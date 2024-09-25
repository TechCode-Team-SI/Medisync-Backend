import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DiagnosticDto } from 'src/diagnostics/dto/diagnostic.dto';
import { ObjectTransformer } from 'src/utils/transformers/object-transformer';

export class FinishRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsObject()
  @Transform(ObjectTransformer(DiagnosticDto))
  @ValidateNested()
  @Type(() => DiagnosticDto)
  diagnostic: DiagnosticDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  instructions: string;
}
