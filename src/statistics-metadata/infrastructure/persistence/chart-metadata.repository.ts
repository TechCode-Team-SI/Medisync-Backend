import { BaseRepository } from 'src/common/base.repository';
import { StatisticsFilterDto } from 'src/statistics/dto/statistics-filter.dto';
import { Chart } from 'src/statistics-metadata/statistics-metadata.type';

export abstract class ChartMetadataRepository extends BaseRepository {
  abstract gender(date?: StatisticsFilterDto, userId?: string): Promise<Chart>;

  abstract age(date?: StatisticsFilterDto, userId?: string): Promise<Chart>;

  abstract requestStatus(
    date?: StatisticsFilterDto,
    userId?: string,
  ): Promise<Chart>;

  abstract rating(date?: StatisticsFilterDto, userId?: string): Promise<Chart>;
}
