import { forwardRef, Module } from '@nestjs/common';
import { RequestSavedDataService } from './request-saved-data.service';
import { RequestSavedDataController } from './request-saved-data.controller';
import { RelationalRequestSavedDataPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { RequestsModule } from 'src/requests/requests.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    RelationalRequestSavedDataPersistenceModule,
    UsersModule,
    forwardRef(() => RequestsModule),
  ],
  controllers: [RequestSavedDataController],
  providers: [RequestSavedDataService],
  exports: [
    RequestSavedDataService,
    RelationalRequestSavedDataPersistenceModule,
  ],
})
export class RequestSavedDataModule {}
