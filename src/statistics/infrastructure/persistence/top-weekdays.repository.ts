import { BaseRepository } from 'src/common/base.repository';
import { TopWeekdays } from 'src/statistics/domain/top-weekdays';
import { StatisticsDateDto } from 'src/statistics/dto/statistics-date.dto';

export abstract class TopWeekdaysRepository extends BaseRepository {
  abstract findAll(date?: StatisticsDateDto): Promise<TopWeekdays[]>;
}
