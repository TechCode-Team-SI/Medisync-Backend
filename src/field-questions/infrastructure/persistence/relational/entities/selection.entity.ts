import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { FieldQuestionEntity } from './field-question.entity';

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
}
