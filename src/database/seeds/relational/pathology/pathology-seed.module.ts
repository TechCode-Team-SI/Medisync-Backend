import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PathologyEntity } from 'src/pathologies/infrastructure/persistence/relational/entities/pathology.entity';
import { PathologySeedService } from './pathology-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([PathologyEntity])],
  providers: [PathologySeedService],
  exports: [PathologySeedService],
})
export class PathologySeedModule {}
