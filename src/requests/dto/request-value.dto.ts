import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { FieldQuestionDto } from 'src/field-questions/dto/field-question.dto';
import { SelectionIdDto } from 'src/field-questions/dto/selection-id.dto';

export class RequestValueDto {
  @ApiProperty()
  @IsNotEmpty()
  fieldQuestion: FieldQuestionDto;

  @ApiProperty()
  @IsNotEmpty()
  selections?: SelectionIdDto[];

  @ApiProperty()
  @IsNotEmpty()
  value?: string;
}
