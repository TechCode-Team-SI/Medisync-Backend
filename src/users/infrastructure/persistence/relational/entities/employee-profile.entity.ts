import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'employee_profile',
})
export class EmployeeProfileEntity extends EntityRelationalHelper {
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

  @ApiProperty()
  @Column()
  birthday: Date;

  @ApiProperty()
  @Column()
  address: string;
}
