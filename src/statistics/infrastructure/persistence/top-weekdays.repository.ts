import { BaseRepository } from 'src/common/base.repository';
import { TopWeekdays } from 'src/statistics/domain/top-weekdays';
import { FindTopGeneralDto } from 'src/statistics/dto/find-top-general.dto';

export abstract class TopWeekdaysRepository extends BaseRepository {
  abstract findAll(time?: FindTopGeneralDto): Promise<TopWeekdays[]>;
}
