import { BaseRepository } from 'src/common/base.repository';
import { TopSpecialties } from 'src/statistics/domain/top-specialties';
import { FindTopGeneralDto } from 'src/statistics/dto/find-top-general.dto';

export abstract class TopSpecialtiesRepository extends BaseRepository {
  abstract findAll(time?: FindTopGeneralDto): Promise<TopSpecialties[]>;
}
