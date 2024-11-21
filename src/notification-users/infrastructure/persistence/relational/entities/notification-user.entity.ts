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
import { NotificationEntity } from 'src/notifications/infrastructure/persistence/relational/entities/notification.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'notification_user',
})
export class NotificationUserEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(
    () => NotificationEntity,
    (notification) => notification.notificationUsers,
  )
  notification: NotificationEntity;

  @ApiProperty()
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ApiProperty()
  @Column({ nullable: false })
  read: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
