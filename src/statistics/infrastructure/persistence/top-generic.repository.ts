import { BaseRepository } from 'src/common/base.repository';
import { TopGeneric } from 'src/statistics/domain/top-generic';
import { StatisticsDateDto } from 'src/statistics/dto/statistics-date.dto';
import { StatisticsTopEnum } from 'src/statistics/statistics-top.enum';

export abstract class TopGenericRepository extends BaseRepository {
  abstract findAll(
    date?: StatisticsDateDto,
    filter?: StatisticsTopEnum,
  ): Promise<TopGeneric[]>;
}
