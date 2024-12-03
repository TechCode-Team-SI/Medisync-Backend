import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import {
  FilteredByType,
  ChartTypeEnum,
} from 'src/statistics-metadata/statistics-metadata.enum';
import { FieldQuestionEntity } from 'src/field-questions/infrastructure/persistence/relational/entities/field-question.entity';

@Entity({
  name: 'statistics_metadata',
})
export class StatisticsMetadataEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  label: string;

  @ApiProperty()
  @Column({ nullable: false, enum: ChartTypeEnum, type: 'enum' })
  type: ChartTypeEnum;

  @ApiProperty()
  @Column({ nullable: false, type: 'enum', enum: FilteredByType })
  filteredByType: FilteredByType;

  @ApiProperty()
  @Column({ nullable: true })
  filter?: string;

  @ApiProperty()
  @ManyToOne(() => FieldQuestionEntity)
  fieldQuestion: FieldQuestionEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
