import { Module } from '@nestjs/common';
import { PathologiesService } from './pathologies.service';
import { PathologiesController } from './pathologies.controller';
import { RelationalPathologyPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalPathologyPersistenceModule],
  controllers: [PathologiesController],
  providers: [PathologiesService],
  exports: [PathologiesService, RelationalPathologyPersistenceModule],
})
export class PathologiesModule {}
