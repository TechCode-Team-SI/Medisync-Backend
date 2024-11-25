import { ApiProperty } from '@nestjs/swagger';
import {
  Histogram,
  Tart,
} from 'src/statistics-metadata/statistics-metadata.type';

export class Graph {
  @ApiProperty()
  histograms: Histogram[];

  @ApiProperty()
  tarts: Tart[];
}
