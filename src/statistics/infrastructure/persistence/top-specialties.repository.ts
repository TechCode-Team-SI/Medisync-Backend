import { BaseRepository } from 'src/common/base.repository';
import { TopSpecialties } from 'src/statistics/domain/top-specialties';
import { StatisticsDateDto } from 'src/statistics/dto/statistics-date.dto';

export abstract class TopSpecialtiesRepository extends BaseRepository {
  abstract findAll(date?: StatisticsDateDto): Promise<TopSpecialties[]>;
}
