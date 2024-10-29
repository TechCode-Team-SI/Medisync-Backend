import { ApiProperty } from '@nestjs/swagger';
import { EmployeeProfileEntity } from 'src/employee-profiles/infrastructure/persistence/relational/entities/employee-profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'schedule',
})
export class ScheduleEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @ApiProperty()
  @Column({ nullable: false })
  from: string;

  @ApiProperty()
  @Column({ nullable: false })
  to: string;

  @ApiProperty({
    type: () => EmployeeProfileEntity,
  })
  @OneToMany(() => EmployeeProfileEntity, (employee) => employee.schedule)
  employees: EmployeeProfileEntity[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
