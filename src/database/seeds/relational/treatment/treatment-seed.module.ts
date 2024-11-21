import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TreatmentEntity } from 'src/treatments/infrastructure/persistence/relational/entities/treatment.entity';
import { TreatmentSeedService } from './treatment-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([TreatmentEntity])],
  providers: [TreatmentSeedService],
  exports: [TreatmentSeedService],
})
export class TreatmentSeedModule {}
