// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateStatisticsDto } from './create-statistics.dto';

export class UpdateStatisticsDto extends PartialType(CreateStatisticsDto) {}
