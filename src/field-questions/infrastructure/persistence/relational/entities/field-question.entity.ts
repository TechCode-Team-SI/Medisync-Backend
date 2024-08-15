import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { FieldQuestionTypeEnum } from 'src/field-questions/field-questions.enum';
import { SelectionConfigurationEntity } from './selection-configuration.entity';

@Entity({
  name: 'field_question',
})
export class FieldQuestionEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  @Index()
  slug: string;

  @ApiProperty()
  @Column()
  label: string;

  @ApiProperty()
  @Column({ nullable: true })
  description?: string;

  @ApiProperty()
  @Column()
  type: FieldQuestionTypeEnum;

  @ApiProperty()
  @OneToOne(
    () => SelectionConfigurationEntity,
    (selectionConfig) => selectionConfig.fieldQuestion,
    {
      nullable: true,
      cascade: true,
    },
  )
  selectionConfig?: SelectionConfigurationEntity;

  @ApiProperty()
  @Column()
  isRequired: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
