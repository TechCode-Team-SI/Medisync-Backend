import { ApiProperty } from '@nestjs/swagger';
import { FieldQuestionTypeEnum } from 'src/field-questions/field-questions.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { SelectionConfigurationEntity } from './selection-configuration.entity';
import { SelectionEntity } from './selection.entity';

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

  @ApiProperty({
    type: () => SelectionConfigurationEntity,
  })
  @OneToOne(
    () => SelectionConfigurationEntity,
    (selectionConfig) => selectionConfig.fieldQuestion,
    {
      nullable: true,
      cascade: true,
    },
  )
  selectionConfig?: SelectionConfigurationEntity;

  @ApiProperty({
    type: () => SelectionEntity,
  })
  @OneToMany(() => SelectionEntity, (selection) => selection.fieldQuestion, {
    nullable: true,
    cascade: true,
  })
  selections?: SelectionEntity[];

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
