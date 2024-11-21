import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopMedicsRepository } from '../top-medics.repository';
import { TopSpecialtiesRepository } from '../top-specialties.repository';
import { TopMedicsEntity } from './entities/top-medics.entity';
import { TopSpecialtiesEntity } from './entities/top-specialties.entity';
import { TopMedicsRelationalRepository } from './repositories/top-medics.repository';
import { TopSpecialtiesRelationalRepository } from './repositories/top-specialties.repository';
import { TopWeekdaysEntity } from './entities/top-weekdays.entity';
import { TopWeekdaysRepository } from '../top-weekdays.repository';
import { TopWeekdaysRelationalRepository } from './repositories/top-weekdays.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TopMedicsEntity,
      TopSpecialtiesEntity,
      TopWeekdaysEntity,
    ]),
  ],
  providers: [
    {
      provide: TopMedicsRepository,
      useClass: TopMedicsRelationalRepository,
    },
    {
      provide: TopSpecialtiesRepository,
      useClass: TopSpecialtiesRelationalRepository,
    },
    {
      provide: TopWeekdaysRepository,
      useClass: TopWeekdaysRelationalRepository,
    },
  ],
  exports: [
    TopMedicsRepository,
    TopSpecialtiesRepository,
    TopWeekdaysRepository,
  ],
})
export class RelationalStatisticsPersistenceModule {}
