import { Module } from '@nestjs/common';
import { PathologiesService } from './pathologies.service';
import { PathologiesController } from './pathologies.controller';
import { RelationalPathologyPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { permissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [RelationalPathologyPersistenceModule, permissionsModule],
  controllers: [PathologiesController],
  providers: [PathologiesService],
  exports: [PathologiesService, RelationalPathologyPersistenceModule],
})
export class PathologiesModule {}
