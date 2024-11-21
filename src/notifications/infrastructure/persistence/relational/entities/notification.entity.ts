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
import { NotificationUserEntity } from 'src/notification-users/infrastructure/persistence/relational/entities/notification-user.entity';
import { NotificationTypeEnum } from 'src/notifications/notifications.enum';

@Entity({
  name: 'notification',
})
export class NotificationEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: false })
  title: string;

  @ApiProperty()
  @Column({ nullable: false })
  content: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'enum', enum: NotificationTypeEnum })
  type: NotificationTypeEnum;

  @ApiProperty()
  @OneToMany(
    () => NotificationUserEntity,
    (notificationUser) => notificationUser.notification,
    {
      cascade: true,
    },
  )
  notificationUsers: NotificationUserEntity[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
