import { ApiProperty } from '@nestjs/swagger';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';
import { SpecialtyEntity } from 'src/specialties/infrastructure/persistence/relational/entities/specialty.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { InjuryEntity } from 'src/injuries/infrastructure/persistence/relational/entities/injury.entity';
import { SymptomEntity } from 'src/symptoms/infrastructure/persistence/relational/entities/symptom.entity';
import { TreatmentEntity } from 'src/treatments/infrastructure/persistence/relational/entities/treatment.entity';
import { PathologyEntity } from 'src/pathologies/infrastructure/persistence/relational/entities/pathology.entity';

@Entity({
  name: 'diagnostic',
})
export class DiagnosticEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity)
  madeBy: UserEntity;

  @ApiProperty()
  @ManyToOne(() => SpecialtyEntity)
  specialty: SpecialtyEntity;

  @ApiProperty()
  @ManyToOne(() => RequestEntity)
  request: RequestEntity;

  @ApiProperty()
  @ManyToMany(() => InjuryEntity)
  @JoinTable({ name: 'diagnostic_injury' })
  injuries: InjuryEntity[];

  @ApiProperty()
  @ManyToMany(() => SymptomEntity)
  @JoinTable({ name: 'diagnostic_symptom' })
  symptoms: SymptomEntity[];

  @ApiProperty()
  @ManyToMany(() => TreatmentEntity)
  @JoinTable({ name: 'diagnostic_treatment' })
  treatments: TreatmentEntity[];

  @ApiProperty()
  @ManyToMany(() => PathologyEntity)
  @JoinTable({ name: 'diagnostic_pathology' })
  pathologies: PathologyEntity[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
