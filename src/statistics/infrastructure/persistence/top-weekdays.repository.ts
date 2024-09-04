import { BaseRepository } from 'src/common/base.repository';
import { TopWeekdays } from 'src/statistics/domain/top-weekdays';
import { StatisticsTimeEnum } from 'src/statistics/statistics-time.enum';

export abstract class TopWeekdaysRepository extends BaseRepository {
  abstract findAll(time?: StatisticsTimeEnum): Promise<TopWeekdays[]>;
}
