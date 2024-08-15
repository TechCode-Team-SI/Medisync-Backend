import { ApiProperty } from '@nestjs/swagger';
import { FieldQuestion } from './field-question';

export class SelectionConfiguration {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  isMultiple: boolean;

  @ApiProperty()
  fieldQuestion: FieldQuestion;
}
