// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateFieldQuestionDto } from './create-field-question.dto';

export class UpdateFieldQuestionDto extends PartialType(
  CreateFieldQuestionDto,
) {}
