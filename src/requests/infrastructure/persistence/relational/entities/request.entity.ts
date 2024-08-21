import { ApiProperty } from '@nestjs/swagger';
import { RequestTemplateEntity } from 'src/request-templates/infrastructure/persistence/relational/entities/request-template.entity';
import { RequestStatusEnum } from 'src/requests/requests.enum';
import { SpecialtyEntity } from 'src/specialties/infrastructure/persistence/relational/entities/specialty.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { RequestValueEntity } from './request-value.entity';

@Entity({
  name: 'request',
})
export class RequestEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  patientFullName: string;

  @ApiProperty()
  @Column()
  patientDNI: string;

  @ApiProperty()
  @Column()
  patientAddress: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity)
  requestedMedic: UserEntity;

  @ApiProperty()
  @ManyToOne(() => SpecialtyEntity)
  requestedSpecialty: SpecialtyEntity;

  @ApiProperty()
  @ManyToOne(() => RequestTemplateEntity)
  requestTemplate: RequestTemplateEntity;

  @ApiProperty()
  @OneToMany(() => RequestValueEntity, (requestValue) => requestValue.request, {
    cascade: true,
  })
  requestValues: RequestValueEntity[];

  @ApiProperty()
  @Column()
  appointmentHour: string;

  @ApiProperty()
  @Column()
  status: RequestStatusEnum;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
