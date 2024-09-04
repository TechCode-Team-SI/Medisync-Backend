import { WeekDays } from 'src/utils/weekdays.enum';
import { TopWeekdays } from '../../../../domain/top-weekdays';
import { TopWeekdaysEntity } from '../entities/top-weekdays.entity';

export class TopWeekdaysMapper {
  static toDomain(raw: TopWeekdaysEntity): TopWeekdays {
    const domainEntity = new TopWeekdays();
    domainEntity.weekday = WeekDays[raw.weekday];
    domainEntity.requests = raw.requests;

    return domainEntity;
  }
}
