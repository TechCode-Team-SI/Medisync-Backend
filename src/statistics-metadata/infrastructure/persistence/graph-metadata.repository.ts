import { BaseRepository } from 'src/common/base.repository';
import { StatisticsDateDto } from 'src/statistics/dto/statistics-date.dto';
import { Chart } from 'src/statistics-metadata/statistics-metadata.type';

export abstract class GraphMetadataRepository extends BaseRepository {
  abstract gender(date?: StatisticsDateDto): Promise<Chart>;

  abstract age(date?: StatisticsDateDto): Promise<Chart>;

  abstract requestStatus(date?: StatisticsDateDto): Promise<Chart>;

  abstract rating(date?: StatisticsDateDto): Promise<Chart>;
}
