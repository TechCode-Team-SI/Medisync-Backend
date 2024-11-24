import { Module } from '@nestjs/common';
import { StatisticsMetadataRepository } from '../statistics-metadata.repository';
import { StatisticsMetadataRelationalRepository } from './repositories/statistics-metadata.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsMetadataEntity } from './entities/statistics-metadata.entity';
import { GraphMetadataRepository } from '../graph-metadata.repository';
import { GraphMetadataRelationalRepository } from './repositories/graph-metadata.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StatisticsMetadataEntity])],
  providers: [
    {
      provide: StatisticsMetadataRepository,
      useClass: StatisticsMetadataRelationalRepository,
    },
    {
      provide: GraphMetadataRepository,
      useClass: GraphMetadataRelationalRepository,
    },
  ],
  exports: [StatisticsMetadataRepository, GraphMetadataRepository],
})
export class RelationalStatisticsMetadataPersistenceModule {}
