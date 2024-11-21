import { ApiProperty } from '@nestjs/swagger';
import { ViewColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

export class TopWeekdaysEntity extends EntityRelationalHelper {
  @ApiProperty()
  @ViewColumn()
  weekday: string;

  @ApiProperty()
  @ViewColumn()
  requests: number;
}
