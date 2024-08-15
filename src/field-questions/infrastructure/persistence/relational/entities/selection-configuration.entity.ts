import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { FieldQuestionEntity } from './field-question.entity';

@Entity({
  name: 'field_question',
})
export class SelectionConfigurationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  isMultiple: boolean;

  @ApiProperty()
  @OneToOne(
    () => FieldQuestionEntity,
    (fieldQuestion) => fieldQuestion.selectionConfig,
  )
  @JoinColumn({ name: 'field_question_id' })
  fieldQuestion: FieldQuestionEntity;
}
