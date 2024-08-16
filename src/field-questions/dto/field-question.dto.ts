import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FieldQuestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
