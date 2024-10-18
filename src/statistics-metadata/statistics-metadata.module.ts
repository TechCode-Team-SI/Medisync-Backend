import { Module } from '@nestjs/common';
import { StatisticsMetadataService } from './statistics-metadata.service';
import { StatisticsMetadataController } from './statistics-metadata.controller';
import { RelationalStatisticsMetadataPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FieldQuestionsModule } from 'src/field-questions/field-questions.module';

@Module({
  imports: [
    RelationalStatisticsMetadataPersistenceModule,
    FieldQuestionsModule,
  ],
  controllers: [StatisticsMetadataController],
  providers: [StatisticsMetadataService],
  exports: [
    StatisticsMetadataService,
    RelationalStatisticsMetadataPersistenceModule,
  ],
})
export class StatisticsMetadataModule {}
