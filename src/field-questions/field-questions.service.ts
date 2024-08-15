import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateFieldQuestionDto } from './dto/create-field-question.dto';
import { UpdateFieldQuestionDto } from './dto/update-field-question.dto';
import { FieldQuestionRepository } from './infrastructure/persistence/field-question.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FieldQuestion } from './domain/field-question';
import { findOptions } from 'src/utils/types/fine-options.type';
import { slugify } from 'src/utils/utils';
import { exceptionResponses } from './field-questions.messages';

@Injectable()
export class FieldQuestionsService {
  constructor(
    private readonly fieldQuestionRepository: FieldQuestionRepository,
  ) {}

  async create(createFieldQuestionDto: CreateFieldQuestionDto) {
    const slug = slugify(createFieldQuestionDto.name);

    const question = await this.fieldQuestionRepository.findBySlug(slug);
    if (question) {
      throw new UnprocessableEntityException(exceptionResponses.AlreadyExists);
    }

    const clonedPayload = {
      ...createFieldQuestionDto,
      slug,
    };

    return this.fieldQuestionRepository.create(clonedPayload);
  }

  findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }) {
    return this.fieldQuestionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
    });
  }

  findOne(id: FieldQuestion['id'], options?: findOptions) {
    return this.fieldQuestionRepository.findById(id, options);
  }

  update(
    id: FieldQuestion['id'],
    updateFieldQuestionDto: UpdateFieldQuestionDto,
  ) {
    return this.fieldQuestionRepository.update(id, updateFieldQuestionDto);
  }

  remove(id: FieldQuestion['id']) {
    return this.fieldQuestionRepository.remove(id);
  }
}
