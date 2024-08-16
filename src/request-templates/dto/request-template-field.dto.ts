import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { FieldQuestionDto } from 'src/field-questions/dto/field-question.dto';

export class RequestTemplateFieldDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @ApiProperty()
  @IsNotEmpty()
  fieldQuestion: FieldQuestionDto;
}
