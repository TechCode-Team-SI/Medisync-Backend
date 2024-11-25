import { BaseRepository } from 'src/common/base.repository';
import { StatisticsDateDto } from 'src/statistics/dto/statistics-date.dto';
import {
  Histogram,
  Tart,
} from 'src/statistics-metadata/statistics-metadata.type';

export abstract class GraphMetadataRepository extends BaseRepository {
  abstract gender(date?: StatisticsDateDto): Promise<Tart>;

  abstract age(date?: StatisticsDateDto): Promise<Histogram>;

  abstract requestStatus(date?: StatisticsDateDto): Promise<Tart>;

  abstract rating(date?: StatisticsDateDto): Promise<Histogram>;
}
