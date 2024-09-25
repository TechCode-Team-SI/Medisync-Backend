// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSymptomDto } from './create-symptom.dto';

export class UpdateSymptomDto extends PartialType(CreateSymptomDto) {}
