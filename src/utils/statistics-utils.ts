import { StatisticsFilterDto } from 'src/statistics/dto/statistics-filter.dto';
import { StatisticsTimeUnitEnum } from 'src/statistics/statistics-time-unit.enum';
import { StatisticsDiagnosticTopEnum } from 'src/statistics/statistics-top.enum';

export function formatDate(dateString: string): string {
  return dateString.split('T')[0];
}

export function dateRangeQuery(date?: StatisticsFilterDto): string {
  if (!date) return '';

  const dateFrom = date.from ? formatDate(date.from) : null;
  const dateTo = date.to ? formatDate(date.to) : null;

  if (dateFrom && dateTo) {
    return `BETWEEN DATE(\'${dateFrom}\') AND DATE(\'${dateTo}\')`;
  }

  if (dateFrom) {
    return `BETWEEN DATE(\'${dateFrom}\') AND CURRENT_DATE()`;
  }

  if (dateTo) {
    const minimumDate = '2000-01-01';
    return `BETWEEN DATE(\'${minimumDate}\') AND DATE(\'${dateTo}\')`;
  }

  return '';
}

export function dateGroupingQuery(grouping?: StatisticsTimeUnitEnum): string {
  switch (grouping) {
    case StatisticsTimeUnitEnum.YEAR:
      return 'YEAR';
    case StatisticsTimeUnitEnum.MONTH:
      return 'MONTH';
    case StatisticsTimeUnitEnum.DAY:
      return 'DAY';
    case StatisticsTimeUnitEnum.HOUR:
      return 'HOUR';
    default:
      return '';
  }
}

export function topDiagnosticQuery(
  filter?: StatisticsDiagnosticTopEnum,
): string[] {
  switch (filter) {
    case StatisticsDiagnosticTopEnum.INJURY:
      return ['injury', 'injuries'];
    case StatisticsDiagnosticTopEnum.PATHOLOGY:
      return ['pathology', 'pathologies'];
    case StatisticsDiagnosticTopEnum.SYMPTOM:
      return ['symptom', 'symptoms'];
    case StatisticsDiagnosticTopEnum.TREATMENT:
      return ['treatment', 'treatments'];
    default:
      return ['', ''];
  }
}
