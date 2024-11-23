import { StatisticsDateDto } from 'src/statistics/dto/statistics-date.dto';
import { StatisticsTimeUnitEnum } from 'src/statistics/statistics-time-unit.enum';
import { StatisticsTopEnum } from 'src/statistics/statistics-top.enum';

export function formatDate(dateString: string): string {
  return dateString.split('T')[0];
}

export function dateRangeQuery(date?: StatisticsDateDto): string {
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
      return '%Y';
    case StatisticsTimeUnitEnum.MONTH:
      return '%Y %m';
    case StatisticsTimeUnitEnum.DAY:
      return '%Y %m %d';
    default:
      return '';
  }
}

export function topQuery(filter?: StatisticsTopEnum): string {
  switch (filter) {
    case StatisticsTopEnum.ILLNESS:
      return 'illness';
    case StatisticsTopEnum.INJURY:
      return 'injury';
    case StatisticsTopEnum.SYMPTOM:
      return 'symptom';
    case StatisticsTopEnum.TREATMENT:
      return 'treatment';
    default:
      return '';
  }
}
