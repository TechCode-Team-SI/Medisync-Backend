import { Module } from '@nestjs/common';
import { FieldQuestionsService } from './field-questions.service';
import { FieldQuestionsController } from './field-questions.controller';
import { RelationalFieldQuestionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalFieldQuestionPersistenceModule],
  controllers: [FieldQuestionsController],
  providers: [FieldQuestionsService],
  exports: [FieldQuestionsService, RelationalFieldQuestionPersistenceModule],
})
export class FieldQuestionsModule {}
