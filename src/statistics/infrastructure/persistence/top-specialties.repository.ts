import { BaseRepository } from 'src/common/base.repository';
import { TopSpecialties } from 'src/statistics/domain/top-specialties';
import { StatisticsTimeEnum } from 'src/statistics/statistics-time.enum';

export abstract class TopSpecialtiesRepository extends BaseRepository {
  abstract findAll(time?: StatisticsTimeEnum): Promise<TopSpecialties[]>;
}
