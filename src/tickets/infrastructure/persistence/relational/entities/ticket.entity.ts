import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { TicketStatusEnum, TicketTypeEnum } from 'src/tickets/tickets.enum';

@Entity({
  name: 'ticket',
})
export class TicketEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: TicketTypeEnum,
  })
  type: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: TicketStatusEnum,
    default: TicketStatusEnum.OPEN,
  })
  status: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'createdBy' })
  createdBy?: UserEntity | null;

  @ApiProperty()
  @Column({ type: 'timestamp', nullable: true })
  closedAt?: Date | null;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
