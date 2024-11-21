import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MedicalCenterEntity } from 'src/medical-centers/infrastructure/persistence/relational/entities/medical-center.entity';
import { MedicalCenterSeedService } from './medical-center.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalCenterEntity])],
  providers: [MedicalCenterSeedService],
  exports: [MedicalCenterSeedService],
})
export class MedicalCenterSeedModule {}
