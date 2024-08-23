import { ApiProperty } from '@nestjs/swagger';
import { RequestTemplate } from './request-template';
import { FieldQuestion } from 'src/field-questions/domain/field-question';

export class RequestTemplateField {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({ type: () => RequestTemplate })
  requestTemplate: RequestTemplate;

  @ApiProperty({ type: () => FieldQuestion })
  fieldQuestion: FieldQuestion;

  @ApiProperty()
  order: number;
}
