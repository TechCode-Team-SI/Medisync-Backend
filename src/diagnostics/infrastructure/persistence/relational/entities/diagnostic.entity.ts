import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { SpecialtyEntity } from 'src/specialties/infrastructure/persistence/relational/entities/specialty.entity';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';

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
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
