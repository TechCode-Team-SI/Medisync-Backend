import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { FieldQuestionEntity } from './field-question.entity';
import { RequestValueEntity } from 'src/requests/infrastructure/persistence/relational/entities/request-value.entity';

@Entity({
  name: 'selection',
})
export class SelectionEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  value: string;

  @ApiProperty({
    type: () => FieldQuestionEntity,
  })
  @ManyToOne(
    () => FieldQuestionEntity,
    (fieldQuestion) => fieldQuestion.selections,
  )
  @JoinColumn({ name: 'field_question_id' })
  fieldQuestion: FieldQuestionEntity;

  @ApiProperty({ type: () => RequestValueEntity })
  @ManyToMany(() => RequestValueEntity)
  @JoinTable({ name: 'request_value_selection' })
  requestValues?: RequestValueEntity[];
}
