import { Module } from '@nestjs/common';
import { ScheduleRepository } from '../schedule.repository';
import { ScheduleRelationalRepository } from './repositories/schedule.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from './entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity])],
  providers: [
    {
      provide: ScheduleRepository,
      useClass: ScheduleRelationalRepository,
    },
  ],
  exports: [ScheduleRepository],
})
export class RelationalSchedulePersistenceModule {}
