import { Module } from '@nestjs/common';
import { RatingRepository } from '../rating.repository';
import { RatingRelationalRepository } from './repositories/rating.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from './entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity])],
  providers: [
    {
      provide: RatingRepository,
      useClass: RatingRelationalRepository,
    },
  ],
  exports: [RatingRepository],
})
export class RelationalRatingPersistenceModule {}
