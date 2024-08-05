import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Entity({
  name: 'confirm_email_token',
})
@Index(['email', 'code'], { unique: true })
export class ConfirmEmailTokenEntity extends EntityRelationalHelper {
  @ApiProperty({
    type: UUID,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Column({ type: String })
  email: string;

  @ApiProperty({
    type: UserEntity,
  })
  @ManyToOne(() => UserEntity, (user) => user.confirmEmailTokens)
  @JoinColumn({ name: 'email', referencedColumnName: 'email' })
  user: UserEntity;

  @ApiProperty({
    type: String,
    example: '182798',
  })
  @Column()
  code: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Column()
  expiresAt: Date;
}
