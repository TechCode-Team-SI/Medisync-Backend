import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';
import { EmployeeProfileEntity } from 'src/users/infrastructure/persistence/relational/entities/employee-profile.entity';

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

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
