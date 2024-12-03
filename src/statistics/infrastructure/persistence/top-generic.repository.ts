import { BaseRepository } from 'src/common/base.repository';
import { TopGeneric } from 'src/statistics/domain/top-generic';
import { StatisticsFilterDto } from 'src/statistics/dto/statistics-filter.dto';
import { StatisticsDiagnosticTopEnum } from 'src/statistics/statistics-top.enum';

export abstract class TopGenericRepository extends BaseRepository {
  abstract findTopMedics(date?: StatisticsFilterDto): Promise<TopGeneric[]>;

  abstract findTopSpecialties(
    date?: StatisticsFilterDto,
  ): Promise<TopGeneric[]>;

  abstract findTopWeekdays(date?: StatisticsFilterDto): Promise<TopGeneric[]>;

  abstract findTopDiagnostic(
    date?: StatisticsFilterDto,
    filter?: StatisticsDiagnosticTopEnum,
  ): Promise<TopGeneric[]>;

  abstract findTopAges(date?: StatisticsFilterDto): Promise<TopGeneric[]>;

  abstract findTopGenders(date?: StatisticsFilterDto): Promise<TopGeneric[]>;

  abstract findTopDetailed(
    date?: StatisticsFilterDto,
    userId?: string,
  ): Promise<TopGeneric[]>;
}
