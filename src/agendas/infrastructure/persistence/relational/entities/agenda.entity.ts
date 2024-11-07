import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { DaysOffEntity } from 'src/days-offs/infrastructure/persistence/relational/entities/days-off.entity';

@Entity({
  name: 'agenda',
})
export class AgendaEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  weekdays: string;

  @ApiProperty()
  @Column({ nullable: false })
  from: string;

  @ApiProperty()
  @Column({ nullable: false })
  to: string;

  @ApiProperty()
  @Column({ nullable: false, default: 30 })
  slotTime: number;

  @ApiProperty()
  @OneToMany(() => DaysOffEntity, (daysOff) => daysOff.agenda, {
    cascade: ['insert', 'update'],
  })
  daysOffs?: DaysOffEntity[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
