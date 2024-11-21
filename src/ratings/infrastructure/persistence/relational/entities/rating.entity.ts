import { ApiProperty } from '@nestjs/swagger';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'rating',
})
export class RatingEntity extends EntityRelationalHelper {
  @ApiProperty()
  @Column({ type: 'text' })
  review: string;

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  stars: number;

  @ApiProperty({
    type: () => UserEntity,
  })
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'ratedBy' })
  ratedBy: UserEntity;

  @ApiProperty({
    type: () => RequestEntity,
  })
  @OneToOne(() => RequestEntity, (requestId) => requestId.rating)
  @JoinColumn({ name: 'requestId' })
  request: RequestEntity;
}
