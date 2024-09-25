import { Module } from '@nestjs/common';
import { IllnessesService } from './illnesses.service';
import { IllnessesController } from './illnesses.controller';
import { RelationalIllnessPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalIllnessPersistenceModule],
  controllers: [IllnessesController],
  providers: [IllnessesService],
  exports: [IllnessesService, RelationalIllnessPersistenceModule],
})
export class IllnessesModule {}
