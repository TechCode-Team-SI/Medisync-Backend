// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateTextfieldFieldQuestionDto } from './create-textfield-field-question.dto';

export class UpdateTextfieldFieldQuestionDto extends PartialType(
  CreateTextfieldFieldQuestionDto,
) {}
