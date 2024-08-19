// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateMedicalCenterDto } from './create-medical-center.dto';

export class UpdateMedicalCenterDto extends PartialType(
  CreateMedicalCenterDto,
) {}
