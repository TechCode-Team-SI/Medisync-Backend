import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { SpecialtyEntity } from 'src/specialties/infrastructure/persistence/relational/entities/specialty.entity';
import { AgendaEntity } from 'src/agendas/infrastructure/persistence/relational/entities/agenda.entity';
import { genderEnum } from 'src/employee-profiles/employee-profiles.enum';

@Entity({
  name: 'employee_profile',
})
export class EmployeeProfileEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ nullable: true })
  MPPS: string;

  @ApiProperty()
  @Column({ nullable: true })
  CML: string;

  @ApiProperty()
  @Column({ default: 'M', nullable: false, type: 'enum', enum: genderEnum })
  gender: genderEnum;

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  dni: string;

  @ApiProperty()
  @OneToOne(() => UserEntity, (user) => user.employeeProfile)
  @JoinColumn()
  user: UserEntity;

  @ApiProperty({
    type: () => SpecialtyEntity,
  })
  @ManyToMany(() => SpecialtyEntity)
  @JoinTable({ name: 'employee_specialty' })
  specialties: SpecialtyEntity[];

  @ApiProperty()
  @ManyToOne(() => AgendaEntity)
  agenda: AgendaEntity;

  @ApiProperty()
  @Column()
  birthday: Date;

  @ApiProperty()
  @Column()
  address: string;
}
