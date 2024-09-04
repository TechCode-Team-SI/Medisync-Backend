import { BaseRepository } from 'src/common/base.repository';
import { TopMedics } from 'src/statistics/domain/top-medics';
import { StatisticsTimeEnum } from 'src/statistics/statistics-time.enum';

export abstract class TopMedicsRepository extends BaseRepository {
  abstract findAll(time?: StatisticsTimeEnum): Promise<TopMedics[]>;
}
