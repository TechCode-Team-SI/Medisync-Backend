import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { RequestTemplateFieldEntity } from './request-template-field.entity';
import { SpecialtyEntity } from 'src/specialties/infrastructure/persistence/relational/entities/specialty.entity';

@Entity({
  name: 'request_template',
})
export class RequestTemplateEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description?: string;

  @ApiProperty()
  @Column({ unique: true })
  slug: string;

  @ApiProperty()
  @OneToMany(() => SpecialtyEntity, (specialty) => specialty.requestTemplate)
  specialties?: SpecialtyEntity[];

  @ApiProperty()
  @OneToMany(
    () => RequestTemplateFieldEntity,
    (field) => field.requestTemplate,
    { cascade: true },
  )
  fields: RequestTemplateFieldEntity[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
