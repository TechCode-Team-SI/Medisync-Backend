import { BaseRepository } from 'src/common/base.repository';
import { TopMedics } from 'src/statistics/domain/top-medics';
import { StatisticsDateDto } from 'src/statistics/dto/statistics-date.dto';

export abstract class TopMedicsRepository extends BaseRepository {
  abstract findAll(date?: StatisticsDateDto): Promise<TopMedics[]>;
}
