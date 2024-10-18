import { Module } from '@nestjs/common';
import { StatisticsMetadataRepository } from '../statistics-metadata.repository';
import { StatisticsMetadataRelationalRepository } from './repositories/statistics-metadata.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsMetadataEntity } from './entities/statistics-metadata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatisticsMetadataEntity])],
  providers: [
    {
      provide: StatisticsMetadataRepository,
      useClass: StatisticsMetadataRelationalRepository,
    },
  ],
  exports: [StatisticsMetadataRepository],
})
export class RelationalStatisticsMetadataPersistenceModule {}
