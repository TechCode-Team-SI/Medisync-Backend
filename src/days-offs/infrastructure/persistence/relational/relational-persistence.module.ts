import { Module } from '@nestjs/common';
import { DaysOffRepository } from '../days-off.repository';
import { DaysOffRelationalRepository } from './repositories/days-off.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DaysOffEntity } from './entities/days-off.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DaysOffEntity])],
  providers: [
    {
      provide: DaysOffRepository,
      useClass: DaysOffRelationalRepository,
    },
  ],
  exports: [DaysOffRepository],
})
export class RelationalDaysOffPersistenceModule {}
