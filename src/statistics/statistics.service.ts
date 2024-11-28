import { Injectable } from '@nestjs/common';
import { TopMedicsRepository } from './infrastructure/persistence/top-medics.repository';
import { TopSpecialtiesRepository } from './infrastructure/persistence/top-specialties.repository';
import { TopWeekdaysRepository } from './infrastructure/persistence/top-weekdays.repository';
import { StatisticsMetadataRepository } from 'src/statistics-metadata/infrastructure/persistence/statistics-metadata.repository';
import { StatisticsDateDto } from './dto/statistics-date.dto';
import { TopGenericRepository } from './infrastructure/persistence/top-generic.repository';
import { StatisticsTopEnum } from './statistics-top.enum';
import { StatisticType } from 'src/statistics-metadata/statistics-metadata.enum';
import { Chart } from 'src/statistics-metadata/statistics-metadata.type';
import { GraphMetadataRepository } from 'src/statistics-metadata/infrastructure/persistence/graph-metadata.repository';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly topMedicsRepository: TopMedicsRepository,
    private readonly topSpecialtiesRepository: TopSpecialtiesRepository,
    private readonly topWeekdaysRepository: TopWeekdaysRepository,
    private readonly statisticMetadataRepository: StatisticsMetadataRepository,
    private readonly topGenericRepository: TopGenericRepository,
    private readonly graphMetadataRepository: GraphMetadataRepository,
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
    const chartData: Chart[] = [];

    const metadatas = await this.statisticMetadataRepository.findAll({});
    await Promise.all(
      metadatas.map(async (metadata) => {
        switch (metadata.type) {
          case StatisticType.PIE:
            chartData.push(
              await this.statisticMetadataRepository.genPieMetadata(
                metadata,
                date,
              ),
            );
            break;
          case StatisticType.BAR:
            chartData.push(
              await this.statisticMetadataRepository.genBarMetadata(
                metadata,
                date,
              ),
            );
            break;
        }
      }),
    );

    const ageGraph = await this.graphMetadataRepository.age(date);
    if (ageGraph.data.length > 0) {
      chartData.push(ageGraph);
    }

    const ratingGraph = await this.graphMetadataRepository.rating(date);
    if (ratingGraph.data.length > 0) {
      chartData.push(ratingGraph);
    }

    const genderGraph = await this.graphMetadataRepository.gender(date);
    if (genderGraph.data.length > 0) {
      chartData.push(genderGraph);
    }

    const requestStatusGraph =
      await this.graphMetadataRepository.requestStatus(date);
    if (requestStatusGraph.data.length > 0) {
      chartData.push(requestStatusGraph);
    }

    return chartData;
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

  findTopPathology(date?: StatisticsDateDto) {
    return this.topGenericRepository.findAll(date, StatisticsTopEnum.PATHOLOGY);
  }
}
