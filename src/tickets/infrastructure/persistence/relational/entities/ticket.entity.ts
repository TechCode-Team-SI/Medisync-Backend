import { ApiProperty } from '@nestjs/swagger';
import { TicketCommentEntity } from 'src/ticket-comments/infrastructure/persistence/relational/entities/ticket-comment.entity';
import { TicketStatusEnum } from 'src/tickets/tickets.enum';
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
import { TicketTypeEntity } from 'src/ticket-types/infrastructure/persistence/relational/entities/ticket-type.entity';

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
  @OneToMany(() => TicketTypeEntity, (type) => type.ticket)
  type: TicketTypeEntity;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: TicketStatusEnum,
    default: TicketStatusEnum.OPEN,
  })
  status: string;

  @ApiProperty()
  @OneToMany(() => TicketCommentEntity, (comment) => comment.ticket)
  comments: TicketCommentEntity[];

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
