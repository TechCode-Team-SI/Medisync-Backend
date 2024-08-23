import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { FieldQuestionEntity } from './field-question.entity';

@Entity({
  name: 'selection_configuration',
})
export class SelectionConfigurationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  isMultiple: boolean;

  @ApiProperty({
    type: () => FieldQuestionEntity,
  })
  @OneToOne(
    () => FieldQuestionEntity,
    (fieldQuestion) => fieldQuestion.selectionConfig,
  )
  @JoinColumn({ name: 'field_question_id' })
  fieldQuestion: FieldQuestionEntity;
}
