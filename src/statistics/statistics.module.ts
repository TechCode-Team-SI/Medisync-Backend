import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { RelationalStatisticsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalStatisticsPersistenceModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [StatisticsService, RelationalStatisticsPersistenceModule],
})
export class StatisticsModule {}
