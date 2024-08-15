import { Module } from '@nestjs/common';
import { FieldQuestionRepository } from '../field-question.repository';
import { FieldQuestionRelationalRepository } from './repositories/field-question.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldQuestionEntity } from './entities/field-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FieldQuestionEntity])],
  providers: [
    {
      provide: FieldQuestionRepository,
      useClass: FieldQuestionRelationalRepository,
    },
  ],
  exports: [FieldQuestionRepository],
})
export class RelationalFieldQuestionPersistenceModule {}
