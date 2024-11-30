import { Module } from '@nestjs/common';
import { StatisticsMetadataRepository } from '../statistics-metadata.repository';
import { StatisticsMetadataRelationalRepository } from './repositories/statistics-metadata.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsMetadataEntity } from './entities/statistics-metadata.entity';
import { ChartMetadataRepository } from '../chart-metadata.repository';
import { ChartMetadataRelationalRepository } from './repositories/chart-metadata.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StatisticsMetadataEntity])],
  providers: [
    {
      provide: StatisticsMetadataRepository,
      useClass: StatisticsMetadataRelationalRepository,
    },
    {
      provide: ChartMetadataRepository,
      useClass: ChartMetadataRelationalRepository,
    },
  ],
  exports: [StatisticsMetadataRepository, ChartMetadataRepository],
})
export class RelationalStatisticsMetadataPersistenceModule {}
