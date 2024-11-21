// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateIllnessDto } from './create-illness.dto';

export class UpdateIllnessDto extends PartialType(CreateIllnessDto) {}
