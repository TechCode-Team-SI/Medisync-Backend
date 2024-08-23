import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldQuestionEntity } from 'src/field-questions/infrastructure/persistence/relational/entities/field-question.entity';
import { Repository } from 'typeorm';
import fieldQuestions, {
  isTextQuestionType,
  SelectionQuestionType,
  TextQuestionType,
} from './question-seed';

@Injectable()
export class FieldQuestionSeedService {
  constructor(
    @InjectRepository(FieldQuestionEntity)
    private repository: Repository<FieldQuestionEntity>,
  ) {}

  async run() {
    const fieldQuestionsCount = await this.repository.count();
    if (fieldQuestionsCount > 0) return;

    const textQuestions: TextQuestionType[] = [];
    const selectionQuestions: SelectionQuestionType[] = [];

    for (const fieldQuestion of fieldQuestions) {
      if (isTextQuestionType(fieldQuestion)) {
        textQuestions.push(fieldQuestion);
      }
      if (!isTextQuestionType(fieldQuestion)) {
        selectionQuestions.push(fieldQuestion);
      }
      //If it's neither, then ignore the bad formatted question
    }

    for (const textQuestion of textQuestions) {
      const fieldQuestion = this.repository.create(textQuestion);
      await this.repository.save(fieldQuestion);
    }

    for (const selectionQuestion of selectionQuestions) {
      const fieldQuestion = this.repository.create(selectionQuestion);
      await this.repository.save(fieldQuestion);
    }
  }
}
