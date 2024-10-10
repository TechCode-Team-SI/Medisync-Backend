// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { UserPatientDto } from './user-patient.dto';

export class UpdateUserPatientDto extends PartialType(UserPatientDto) {}
