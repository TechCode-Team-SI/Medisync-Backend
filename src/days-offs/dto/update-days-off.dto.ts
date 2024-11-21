// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateDaysOffDto } from './create-days-off.dto';

export class UpdateDaysOffDto extends PartialType(CreateDaysOffDto) {}
