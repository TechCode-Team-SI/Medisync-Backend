import { ApiProperty } from '@nestjs/swagger';
import { FieldQuestion } from 'src/field-questions/domain/field-question';
import { ChartType } from '../statistics-metadata.enum';
import { FilteredByType } from './../statistics-metadata.enum';

export class StatisticsMetadata {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  fieldQuestion?: FieldQuestion | null;

  @ApiProperty()
  type: ChartType;

  @ApiProperty()
  filteredByType: FilteredByType;

  @ApiProperty()
  filter?: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
