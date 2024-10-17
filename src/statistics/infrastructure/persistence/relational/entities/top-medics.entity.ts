import { ApiProperty } from '@nestjs/swagger';
import { ViewColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

export class TopMedicsEntity extends EntityRelationalHelper {
  @ApiProperty()
  @ViewColumn()
  medicId: string;

  @ApiProperty()
  @ViewColumn()
  fullName: string;

  @ApiProperty()
  @ViewColumn()
  avatar?: string;

  @ApiProperty()
  @ViewColumn()
  requests: number;
}
