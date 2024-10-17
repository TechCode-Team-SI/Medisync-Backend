import { ApiProperty } from '@nestjs/swagger';
import { ViewColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

export class TopSpecialtiesEntity extends EntityRelationalHelper {
  @ApiProperty()
  @ViewColumn()
  specialtyId: string;

  @ApiProperty()
  @ViewColumn()
  name: string;

  @ApiProperty()
  @ViewColumn()
  avatar?: string;

  @ApiProperty()
  @ViewColumn()
  requests: number;
}
