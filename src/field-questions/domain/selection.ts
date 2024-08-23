import { ApiProperty } from '@nestjs/swagger';
import { FieldQuestion } from './field-question';

export class Selection {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  value: string;

  @ApiProperty({ type: () => FieldQuestion })
  fieldQuestion: FieldQuestion;
}
