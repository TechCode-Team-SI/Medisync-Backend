import { Module } from '@nestjs/common';
import { InjuriesService } from './injuries.service';
import { InjuriesController } from './injuries.controller';
import { RelationalInjuryPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { permissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [RelationalInjuryPersistenceModule, permissionsModule],
  controllers: [InjuriesController],
  providers: [InjuriesService],
  exports: [InjuriesService, RelationalInjuryPersistenceModule],
})
export class InjuriesModule {}
