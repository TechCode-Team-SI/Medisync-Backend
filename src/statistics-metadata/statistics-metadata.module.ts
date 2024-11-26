import { Module } from '@nestjs/common';
import { StatisticsMetadataService } from './statistics-metadata.service';
import { StatisticsMetadataController } from './statistics-metadata.controller';
import { RelationalStatisticsMetadataPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FieldQuestionsModule } from 'src/field-questions/field-questions.module';
import { permissionsModule } from 'src/permissions/permissions.module';
import { BullModule } from '@nestjs/bullmq';
import { QueueName } from 'src/utils/queue-enum';

@Module({
  imports: [
    RelationalStatisticsMetadataPersistenceModule,
    FieldQuestionsModule,
    permissionsModule,
    BullModule.registerQueue({ name: QueueName.NOTIFICATION }),
  ],
  controllers: [StatisticsMetadataController],
  providers: [StatisticsMetadataService],
  exports: [
    StatisticsMetadataService,
    RelationalStatisticsMetadataPersistenceModule,
  ],
})
export class StatisticsMetadataModule {}
