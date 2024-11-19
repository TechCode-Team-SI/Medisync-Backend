import { Injectable } from '@nestjs/common';
import { TopMedicsRepository } from './infrastructure/persistence/top-medics.repository';
import { TopSpecialtiesRepository } from './infrastructure/persistence/top-specialties.repository';
import { TopWeekdaysRepository } from './infrastructure/persistence/top-weekdays.repository';
import { StatisticsMetadataRepository } from 'src/statistics-metadata/infrastructure/persistence/statistics-metadata.repository';
import { StatisticsDateDto } from './dto/statistics-date.dto';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly topMedicsRepository: TopMedicsRepository,
    private readonly topSpecialtiesRepository: TopSpecialtiesRepository,
    private readonly topWeekdaysRepository: TopWeekdaysRepository,
    private readonly statisticMetadataRepository: StatisticsMetadataRepository,
  ) {}

  findTopMedics(date?: StatisticsDateDto) {
    return this.topMedicsRepository.findAll(date);
  }

  findtopSpecialties(date?: StatisticsDateDto) {
    return this.topSpecialtiesRepository.findAll(date);
  }

  findtopWeekdays(date?: StatisticsDateDto) {
    return this.topWeekdaysRepository.findAll(date);
  }

  async findStatisticsGraphMetadata(date: StatisticsDateDto) {
    const metadatas = await this.statisticMetadataRepository.findAll({});
    return Promise.all(
      metadatas.map(async (metadata) => {
        //TODO: add control flow for different type of metadata (tart only rn)
        return this.statisticMetadataRepository.genTartMetadata(metadata, date);
      }),
    );
  }
}
