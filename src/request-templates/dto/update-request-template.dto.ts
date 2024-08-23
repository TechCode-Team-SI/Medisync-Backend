// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateRequestTemplateDto } from './create-request-template.dto';

export class UpdateRequestTemplateDto extends PartialType(
  CreateRequestTemplateDto,
) {}
