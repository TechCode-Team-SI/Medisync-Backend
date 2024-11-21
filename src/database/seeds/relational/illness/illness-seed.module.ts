import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IllnessEntity } from 'src/illnesses/infrastructure/persistence/relational/entities/illness.entity';
import { IllnessSeedService } from './illness-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([IllnessEntity])],
  providers: [IllnessSeedService],
  exports: [IllnessSeedService],
})
export class IllnessSeedModule {}
