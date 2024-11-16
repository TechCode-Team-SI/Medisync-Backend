import { BaseRepository } from 'src/common/base.repository';
import { TopMedics } from 'src/statistics/domain/top-medics';
import { FindTopGeneralDto } from 'src/statistics/dto/find-top-general.dto';

export abstract class TopMedicsRepository extends BaseRepository {
  abstract findAll(time?: FindTopGeneralDto): Promise<TopMedics[]>;
}
