import { ApiProperty } from '@nestjs/swagger';
import { FieldQuestionTypeEnum } from '../field-questions.enum';
import { SelectionConfiguration } from './selection-configuration';
import { Selection } from './selection';

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

  @ApiProperty({ type: () => SelectionConfiguration })
  selectionConfig?: SelectionConfiguration | null;

  @ApiProperty({ type: () => Selection })
  selections?: Selection[];

  @ApiProperty()
  isRequired: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
