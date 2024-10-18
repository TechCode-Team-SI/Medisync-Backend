import { Injectable } from '@nestjs/common';
import { TopMedicsRepository } from './infrastructure/persistence/top-medics.repository';
import { StatisticsTimeEnum } from 'src/statistics/statistics-time.enum';
import { TopSpecialtiesRepository } from './infrastructure/persistence/top-specialties.repository';
import { TopWeekdaysRepository } from './infrastructure/persistence/top-weekdays.repository';
import { StatisticsMetadataRepository } from 'src/statistics-metadata/infrastructure/persistence/statistics-metadata.repository';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly topMedicsRepository: TopMedicsRepository,
    private readonly topSpecialtiesRepository: TopSpecialtiesRepository,
    private readonly topWeekdaysRepository: TopWeekdaysRepository,
    private readonly statisticMetadataRepository: StatisticsMetadataRepository,
  ) {}

  findTopMedics(time?: StatisticsTimeEnum) {
    return this.topMedicsRepository.findAll(time);
  }

  findtopSpecialties(time?: StatisticsTimeEnum) {
    return this.topSpecialtiesRepository.findAll(time);
  }

  findtopWeekdays(time?: StatisticsTimeEnum) {
    return this.topWeekdaysRepository.findAll(time);
  }

  async findStatisticsGraphMetadata() {
    const metadatas = await this.statisticMetadataRepository.findAll({});
    return Promise.all(
      metadatas.map(async (metadata) => {
        //TODO: add control flow for different type of metadata (tart only rn)
        return this.statisticMetadataRepository.genTartMetadata(metadata);
      }),
    );
  }
}
