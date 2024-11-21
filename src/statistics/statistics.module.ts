import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { RelationalStatisticsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { StatisticsMetadataModule } from 'src/statistics-metadata/statistics-metadata.module';

@Module({
  imports: [RelationalStatisticsPersistenceModule, StatisticsMetadataModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [StatisticsService, RelationalStatisticsPersistenceModule],
})
export class StatisticsModule {}
