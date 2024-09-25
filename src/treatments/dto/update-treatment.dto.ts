// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatetreatmentDto } from './create-treatment.dto';

export class UpdatetreatmentDto extends PartialType(CreatetreatmentDto) {}
