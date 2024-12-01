import { Injectable } from '@nestjs/common';
import { StatisticsMetadataRepository } from 'src/statistics-metadata/infrastructure/persistence/statistics-metadata.repository';
import { StatisticsFilterDto } from './dto/statistics-filter.dto';
import { TopGenericRepository } from './infrastructure/persistence/top-generic.repository';
import { StatisticsDiagnosticTopEnum } from './statistics-top.enum';
import { ChartTypeEnum } from 'src/statistics-metadata/statistics-metadata.enum';
import { Chart } from 'src/statistics-metadata/statistics-metadata.type';
import { ChartMetadataRepository } from 'src/statistics-metadata/infrastructure/persistence/chart-metadata.repository';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly statisticMetadataRepository: StatisticsMetadataRepository,
    private readonly topGenericRepository: TopGenericRepository,
    private readonly chartMetadataRepository: ChartMetadataRepository,
  ) {}

  findTopMedics(date?: StatisticsFilterDto) {
    return this.topGenericRepository.findTopMedics(date);
  }

  findTopSpecialties(date?: StatisticsFilterDto) {
    return this.topGenericRepository.findTopSpecialties(date);
  }

  findTopWeekdays(date?: StatisticsFilterDto) {
    return this.topGenericRepository.findTopWeekdays(date);
  }

  async findStatisticsGraphMetadata(
    date: StatisticsFilterDto,
    userId?: string,
  ) {
    const chartData: Chart[] = [];

    const metadatas = await this.statisticMetadataRepository.findAll({});
    await Promise.all(
      metadatas.map(async (metadata) => {
        switch (metadata.type) {
          case ChartTypeEnum.PIE:
            chartData.push(
              await this.statisticMetadataRepository.genPieMetadata(
                metadata,
                date,
                userId,
              ),
            );
            break;
          case ChartTypeEnum.BAR:
            chartData.push(
              await this.statisticMetadataRepository.genBarMetadata(
                metadata,
                date,
                userId,
              ),
            );
            break;
        }
      }),
    );

    const ageGraph = await this.chartMetadataRepository.age(date, userId);
    if (ageGraph.data.length > 0) {
      chartData.push(ageGraph);
    }

    const ratingGraph = await this.chartMetadataRepository.rating(date, userId);
    if (ratingGraph.data.length > 0) {
      chartData.push(ratingGraph);
    }

    const genderGraph = await this.chartMetadataRepository.gender(date, userId);
    if (genderGraph.data.length > 0) {
      chartData.push(genderGraph);
    }

    const requestStatusGraph = await this.chartMetadataRepository.requestStatus(
      date,
      userId,
    );
    if (requestStatusGraph.data.length > 0) {
      chartData.push(requestStatusGraph);
    }

    return chartData;
  }

  findTopInjury(date?: StatisticsFilterDto) {
    return this.topGenericRepository.findTopDiagnostic(
      date,
      StatisticsDiagnosticTopEnum.INJURY,
    );
  }

  findTopSymptom(date?: StatisticsFilterDto) {
    return this.topGenericRepository.findTopDiagnostic(
      date,
      StatisticsDiagnosticTopEnum.SYMPTOM,
    );
  }

  findTopTreatment(date?: StatisticsFilterDto) {
    return this.topGenericRepository.findTopDiagnostic(
      date,
      StatisticsDiagnosticTopEnum.TREATMENT,
    );
  }

  findTopPathology(date?: StatisticsFilterDto) {
    return this.topGenericRepository.findTopDiagnostic(
      date,
      StatisticsDiagnosticTopEnum.PATHOLOGY,
    );
  }

  findTopAges(date?: StatisticsFilterDto) {
    return this.topGenericRepository.findTopAges(date);
  }

  findTopGenders(date?: StatisticsFilterDto) {
    return this.topGenericRepository.findTopGenders(date);
  }

  findTopDetailed(date?: StatisticsFilterDto) {
    return this.topGenericRepository.findTopDetailed(date);
  }
}
