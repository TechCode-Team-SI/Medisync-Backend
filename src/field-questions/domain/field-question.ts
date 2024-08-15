import { ApiProperty } from '@nestjs/swagger';
import { FieldQuestionTypeEnum } from '../field-questions.enum';

export class FieldQuestion {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  type: FieldQuestionTypeEnum;

  @ApiProperty()
  isRequired: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
