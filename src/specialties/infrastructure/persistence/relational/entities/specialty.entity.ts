import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';
import { RequestTemplateEntity } from 'src/request-templates/infrastructure/persistence/relational/entities/request-template.entity';
import { EmployeeProfileEntity } from 'src/employee-profiles/infrastructure/persistence/relational/entities/employee-profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'specialty',
})
export class SpecialtyEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({
    type: () => FileEntity,
  })
  @OneToOne(() => FileEntity)
  @JoinColumn()
  image?: FileEntity | null;

  @ApiProperty()
  @Column({ default: false })
  isGroup: boolean;

  @ApiProperty()
  @Column({ default: true })
  isPublic: boolean;

  @ApiProperty()
  @Column({ default: false })
  isDisabled: boolean;

  @ApiProperty({
    type: () => EmployeeProfileEntity,
  })
  @ManyToMany(() => EmployeeProfileEntity)
  @JoinTable({ name: 'employee_specialty' })
  employees: EmployeeProfileEntity[];

  @ApiProperty({
    type: () => EmployeeProfileEntity,
  })
  @ManyToOne(() => RequestTemplateEntity)
  requestTemplate?: RequestTemplateEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
