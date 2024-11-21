import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SymptomEntity } from 'src/symptoms/infrastructure/persistence/relational/entities/symptom.entity';
import { SymptomSeedService } from './symptom-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([SymptomEntity])],
  providers: [SymptomSeedService],
  exports: [SymptomSeedService],
})
export class SymptomSeedModule {}
