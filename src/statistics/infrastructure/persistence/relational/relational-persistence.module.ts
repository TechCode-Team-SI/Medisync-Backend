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
import { TopGenericEntity } from './entities/top-generic.entity';
import { TopGenericRepository } from '../top-generic.repository';
import { TopGenericRelationalRepository } from './repositories/top-generic.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TopMedicsEntity,
      TopSpecialtiesEntity,
      TopWeekdaysEntity,
      TopGenericEntity,
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
    {
      provide: TopGenericRepository,
      useClass: TopGenericRelationalRepository,
    },
  ],
  exports: [
    TopMedicsRepository,
    TopSpecialtiesRepository,
    TopWeekdaysRepository,
    TopGenericRepository,
  ],
})
export class RelationalStatisticsPersistenceModule {}
