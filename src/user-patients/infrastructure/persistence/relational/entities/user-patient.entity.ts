import { ApiProperty } from '@nestjs/swagger';
import { genderEnum } from 'src/employee-profiles/employee-profiles.enum';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';
import { UserPatientFamilyRelationship } from 'src/user-patients/user-patients.enum';

@Entity({
  name: 'user_patient',
})
export class UserPatientEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ default: 'M', nullable: false, type: 'enum', enum: genderEnum })
  gender: genderEnum;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  dni: string;

  @ApiProperty()
  @Column({ nullable: false })
  fullName: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.userPatients)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty()
  @Column({ nullable: false })
  birthday: Date;

  @ApiProperty()
  @Column({ nullable: true })
  address?: string;

  @ApiProperty()
  @OneToMany(() => RequestEntity, (request) => request.savedTo)
  savedRequests?: RequestEntity[];

  @ApiProperty()
  @Column({
    nullable: false,
    default: UserPatientFamilyRelationship.ME,
    enum: UserPatientFamilyRelationship,
    type: 'enum',
  })
  familyRelationship: UserPatientFamilyRelationship;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
