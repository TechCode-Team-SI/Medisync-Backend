// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateInjuryDto } from './create-injury.dto';

export class UpdateInjuryDto extends PartialType(CreateInjuryDto) {}
