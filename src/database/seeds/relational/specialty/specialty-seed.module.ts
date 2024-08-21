import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecialtyEntity } from 'src/specialties/infrastructure/persistence/relational/entities/specialty.entity';
import { SpecialtySeedService } from './specialty-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialtyEntity])],
  providers: [SpecialtySeedService],
  exports: [SpecialtySeedService],
})
export class SpecialtySeedModule {}
