import { ApiProperty } from '@nestjs/swagger';
import { Chart } from 'src/statistics-metadata/statistics-metadata.type';

export class ChartGeneric {
  @ApiProperty()
  chart: Chart[];
}
