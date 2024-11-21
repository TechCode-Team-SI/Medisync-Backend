import { forwardRef, Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RelationalRatingPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from 'src/users/users.module';
import { RequestsModule } from 'src/requests/requests.module';

@Module({
  imports: [
    RelationalRatingPersistenceModule,
    UsersModule,
    forwardRef(() => RequestsModule),
  ],
  providers: [RatingsService],
  exports: [RatingsService, RelationalRatingPersistenceModule],
})
export class RatingsModule {}
