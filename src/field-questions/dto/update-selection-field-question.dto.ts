// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSelectionFieldQuestionDto } from './create-selection-field-question.dto';

export class UpdateSelectionFieldQuestionDto extends PartialType(
  CreateSelectionFieldQuestionDto,
) {}
