// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeProfileDto } from './create-employee-profile.dto';

export class UpdateEmployeeProfileDto extends PartialType(
  CreateEmployeeProfileDto,
) {}
