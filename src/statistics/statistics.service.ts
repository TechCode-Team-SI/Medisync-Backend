import { Injectable } from '@nestjs/common';
import { TopMedicsRepository } from './infrastructure/persistence/top-medics.repository';
import { TopSpecialtiesRepository } from './infrastructure/persistence/top-specialties.repository';
import { TopWeekdaysRepository } from './infrastructure/persistence/top-weekdays.repository';
import { StatisticsMetadataRepository } from 'src/statistics-metadata/infrastructure/persistence/statistics-metadata.repository';
import { StatisticsDateDto } from './dto/statistics-date.dto';
import { TopGenericRepository } from './infrastructure/persistence/top-generic.repository';
import { StatisticsTopEnum } from './statistics-top.enum';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly topMedicsRepository: TopMedicsRepository,
    private readonly topSpecialtiesRepository: TopSpecialtiesRepository,
    private readonly topWeekdaysRepository: TopWeekdaysRepository,
    private readonly statisticMetadataRepository: StatisticsMetadataRepository,
    private readonly topGenericRepository: TopGenericRepository,
  ) {}

  findTopMedics(date?: StatisticsDateDto) {
    return this.topMedicsRepository.findAll(date);
  }

  findTopSpecialties(date?: StatisticsDateDto) {
    return this.topSpecialtiesRepository.findAll(date);
  }

  findTopWeekdays(date?: StatisticsDateDto) {
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

  findTopIllness(date?: StatisticsDateDto) {
    return this.topGenericRepository.findAll(date, StatisticsTopEnum.ILLNESS);
  }

  findTopInjury(date?: StatisticsDateDto) {
    return this.topGenericRepository.findAll(date, StatisticsTopEnum.INJURY);
  }

  findTopSymptom(date?: StatisticsDateDto) {
    return this.topGenericRepository.findAll(date, StatisticsTopEnum.SYMPTOM);
  }

  findTopTreatment(date?: StatisticsDateDto) {
    return this.topGenericRepository.findAll(date, StatisticsTopEnum.TREATMENT);
  }
}
