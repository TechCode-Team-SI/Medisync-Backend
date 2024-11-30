import { BaseRepository } from 'src/common/base.repository';
import { StatisticsFilterDto } from 'src/statistics/dto/statistics-filter.dto';
import { Chart } from 'src/statistics-metadata/statistics-metadata.type';

export abstract class ChartMetadataRepository extends BaseRepository {
  abstract gender(date?: StatisticsFilterDto): Promise<Chart>;

  abstract age(date?: StatisticsFilterDto): Promise<Chart>;

  abstract requestStatus(date?: StatisticsFilterDto): Promise<Chart>;

  abstract rating(date?: StatisticsFilterDto): Promise<Chart>;
}
