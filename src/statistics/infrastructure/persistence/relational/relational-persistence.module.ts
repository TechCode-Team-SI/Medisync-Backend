import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopGenericEntity } from './entities/top-generic.entity';
import { TopGenericRepository } from '../top-generic.repository';
import { TopGenericRelationalRepository } from './repositories/top-generic.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TopGenericEntity])],
  providers: [
    {
      provide: TopGenericRepository,
      useClass: TopGenericRelationalRepository,
    },
  ],
  exports: [TopGenericRepository],
})
export class RelationalStatisticsPersistenceModule {}
