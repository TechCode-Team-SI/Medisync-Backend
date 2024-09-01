import { Module } from '@nestjs/common';
import { RequestSavedDataRepository } from '../request-saved-data.repository';
import { RequestSavedDataRelationalRepository } from './repositories/request-saved-data.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestSavedDataEntity } from './entities/request-saved-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestSavedDataEntity])],
  providers: [
    {
      provide: RequestSavedDataRepository,
      useClass: RequestSavedDataRelationalRepository,
    },
  ],
  exports: [RequestSavedDataRepository],
})
export class RelationalRequestSavedDataPersistenceModule {}
