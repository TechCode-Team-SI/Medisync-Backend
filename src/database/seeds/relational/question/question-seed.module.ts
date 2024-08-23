import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FieldQuestionSeedService } from './question-seed.service';
import { FieldQuestionEntity } from 'src/field-questions/infrastructure/persistence/relational/entities/field-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FieldQuestionEntity])],
  providers: [FieldQuestionSeedService],
  exports: [FieldQuestionSeedService],
})
export class FieldQuestionSeedModule {}
