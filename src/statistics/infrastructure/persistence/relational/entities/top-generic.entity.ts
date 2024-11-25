import { ApiProperty } from '@nestjs/swagger';
import { ViewColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

export class TopGenericEntity extends EntityRelationalHelper {
  @ApiProperty()
  @ViewColumn()
  name: string;

  @ApiProperty()
  @ViewColumn()
  description: string;

  @ApiProperty()
  @ViewColumn()
  requests: number;
}
