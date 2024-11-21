import { ApiProperty } from '@nestjs/swagger';
import { AgendaEntity } from 'src/agendas/infrastructure/persistence/relational/entities/agenda.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { EmployeeProfileEntity } from 'src/employee-profiles/infrastructure/persistence/relational/entities/employee-profile.entity';
import { SpecialtyEntity } from 'src/specialties/infrastructure/persistence/relational/entities/specialty.entity';

@Entity({
  name: 'days_off',
})
export class DaysOffEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  from: Date;

  @ApiProperty()
  @Column()
  to: Date;

  @ApiProperty()
  @ManyToOne(() => AgendaEntity)
  agenda: AgendaEntity;

  @ApiProperty()
  @ManyToOne(() => EmployeeProfileEntity)
  employeeProfile: EmployeeProfileEntity;

  @ApiProperty()
  @ManyToOne(() => SpecialtyEntity)
  specialty: SpecialtyEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
