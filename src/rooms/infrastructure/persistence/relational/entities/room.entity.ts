import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { SpecialtyEntity } from 'src/specialties/infrastructure/persistence/relational/entities/specialty.entity';
import { EmployeeProfileEntity } from 'src/employee-profiles/infrastructure/persistence/relational/entities/employee-profile.entity';

@Entity({
  name: 'room',
})
export class RoomEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty({
    type: () => SpecialtyEntity,
  })
  @OneToOne(() => SpecialtyEntity)
  @JoinColumn()
  specialty?: SpecialtyEntity | null;

  @ApiProperty({
    type: () => EmployeeProfileEntity,
  })
  @OneToMany(
    () => EmployeeProfileEntity,
    (employeeProfile) => employeeProfile.room,
  )
  employeeProfile?: EmployeeProfileEntity | null;

  @ApiProperty()
  @Column({ default: false })
  isDisabled: boolean;
}
