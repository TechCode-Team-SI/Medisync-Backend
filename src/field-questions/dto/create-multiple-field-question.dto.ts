import { ApiProperty } from '@nestjs/swagger';
import { CreateGeneralFieldQuestionDto } from './create-general-field-question.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMultipleFieldQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => CreateGeneralFieldQuestionDto)
  fields: CreateGeneralFieldQuestionDto[];
}
