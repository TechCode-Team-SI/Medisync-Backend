import { ApiProperty } from '@nestjs/swagger';
import { FieldQuestionEntity } from 'src/field-questions/infrastructure/persistence/relational/entities/field-question.entity';
import { SelectionEntity } from 'src/field-questions/infrastructure/persistence/relational/entities/selection.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { RequestEntity } from './request.entity';

@Entity({
  name: 'request_value',
})
export class RequestValueEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => RequestEntity })
  @ManyToOne(() => RequestEntity, (request) => request.requestValues)
  request: RequestEntity;

  @ApiProperty({ type: () => FieldQuestionEntity })
  @ManyToOne(() => FieldQuestionEntity)
  fieldQuestion: FieldQuestionEntity;

  @ApiProperty({ type: () => SelectionEntity })
  @ManyToMany(() => SelectionEntity)
  @JoinTable({ name: 'request_value_selection' })
  selections?: SelectionEntity[];

  @ApiProperty()
  @Column({ nullable: true })
  value?: string;
}
