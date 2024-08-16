import { ApiProperty } from '@nestjs/swagger';
import { FieldQuestionEntity } from 'src/field-questions/infrastructure/persistence/relational/entities/field-question.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { RequestTemplateEntity } from './request-template.entity';

@Entity({
  name: 'request_template_field',
})
@Index(['requestTemplate', 'fieldQuestion'], { unique: true })
export class RequestTemplateFieldEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => RequestTemplateEntity })
  @ManyToOne(
    () => RequestTemplateEntity,
    (requestTemplate) => requestTemplate.fields,
  )
  @JoinColumn({ name: 'request_template_id' })
  requestTemplate: RequestTemplateEntity;

  @ApiProperty({ type: () => FieldQuestionEntity })
  @ManyToOne(() => FieldQuestionEntity)
  @JoinColumn({ name: 'field_question_id' })
  fieldQuestion: FieldQuestionEntity;

  @ApiProperty()
  @Column()
  order: number;
}
