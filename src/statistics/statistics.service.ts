import { Injectable } from '@nestjs/common';
import { TopMedicsRepository } from './infrastructure/persistence/top-medics.repository';
import { TopSpecialtiesRepository } from './infrastructure/persistence/top-specialties.repository';
import { TopWeekdaysRepository } from './infrastructure/persistence/top-weekdays.repository';
import { StatisticsMetadataRepository } from 'src/statistics-metadata/infrastructure/persistence/statistics-metadata.repository';
import { FindTopGeneralDto } from './dto/find-top-general.dto';
import { StatisticsTimeDto } from 'src/statistics-metadata/dto/statistics-time.dto';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly topMedicsRepository: TopMedicsRepository,
    private readonly topSpecialtiesRepository: TopSpecialtiesRepository,
    private readonly topWeekdaysRepository: TopWeekdaysRepository,
    private readonly statisticMetadataRepository: StatisticsMetadataRepository,
  ) {}

  findTopMedics(time?: FindTopGeneralDto) {
    return this.topMedicsRepository.findAll(time);
  }

  findtopSpecialties(time?: FindTopGeneralDto) {
    return this.topSpecialtiesRepository.findAll(time);
  }

  findtopWeekdays(time?: FindTopGeneralDto) {
    return this.topWeekdaysRepository.findAll(time);
  }

  async findStatisticsGraphMetadata(filter: StatisticsTimeDto) {
    const metadatas = await this.statisticMetadataRepository.findAll({});
    return Promise.all(
      metadatas.map(async (metadata) => {
        //TODO: add control flow for different type of metadata (tart only rn)
        return this.statisticMetadataRepository.genTartMetadata(
          metadata,
          filter,
        );
      }),
    );
  }
}
