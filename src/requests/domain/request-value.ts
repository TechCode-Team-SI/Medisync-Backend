import { ApiProperty } from '@nestjs/swagger';
import { Request } from './request';
import { FieldQuestion } from 'src/field-questions/domain/field-question';
import { Selection } from 'src/field-questions/domain/selection';

export class RequestValue {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({ type: () => Request })
  request: Request;

  @ApiProperty({ type: () => FieldQuestion })
  fieldQuestion: FieldQuestion;

  @ApiProperty({ type: () => Selection })
  selections?: Selection[];

  @ApiProperty()
  value?: string;
}
