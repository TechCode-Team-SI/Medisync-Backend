import { Module } from '@nestjs/common';
import { FieldQuestionsService } from './field-questions.service';
import { FieldQuestionsController } from './field-questions.controller';
import { RelationalFieldQuestionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { permissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [RelationalFieldQuestionPersistenceModule, permissionsModule],
  controllers: [FieldQuestionsController],
  providers: [FieldQuestionsService],
  exports: [FieldQuestionsService, RelationalFieldQuestionPersistenceModule],
})
export class FieldQuestionsModule {}
