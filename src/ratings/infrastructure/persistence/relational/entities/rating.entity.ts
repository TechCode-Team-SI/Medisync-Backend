import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';

@Entity({
  name: 'rating',
})
export class RatingEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  stars: number;

  @ApiProperty({
    type: () => UserEntity,
  })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'ratingBy' })
  ratingBy: UserEntity;

  @ApiProperty({
    type: () => RequestEntity,
  })
  @OneToOne(() => RequestEntity, (requestId) => requestId.rating)
  @JoinColumn({ name: 'requestId' })
  requestId: RequestEntity;
}
