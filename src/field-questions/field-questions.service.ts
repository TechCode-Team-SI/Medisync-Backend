import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { findOptions } from 'src/utils/types/fine-options.type';
import { slugify } from 'src/utils/utils';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FieldQuestion } from './domain/field-question';
import { SelectionConfiguration } from './domain/selection-configuration';
import { CreateSelectionFieldQuestionDto } from './dto/create-selection-field-question.dto';
import { CreateTextfieldFieldQuestionDto } from './dto/create-textfield-field-question.dto';
import { FieldQuestionTypeEnum } from './field-questions.enum';
import { exceptionResponses } from './field-questions.messages';
import { FieldQuestionRepository } from './infrastructure/persistence/field-question.repository';
import { Selection } from './domain/selection';

@Injectable()
export class FieldQuestionsService {
  constructor(
    private readonly fieldQuestionRepository: FieldQuestionRepository,
  ) {}

  async createSelection(
    createFieldQuestionDto: CreateSelectionFieldQuestionDto,
  ) {
    const slug = slugify(createFieldQuestionDto.name);

    const question = await this.fieldQuestionRepository.findBySlug(slug);
    if (question) {
      throw new UnprocessableEntityException(exceptionResponses.AlreadyExists);
    }
    const selectionConfig = new SelectionConfiguration();
    selectionConfig.isMultiple =
      createFieldQuestionDto.selectionConfig.isMultiple;

    const selections = createFieldQuestionDto.selections.map((selection) => {
      const selectionData = new Selection();
      selectionData.value = selection.value;
      return selectionData;
    });

    const clonedPayload = {
      ...createFieldQuestionDto,
      slug,
      type: FieldQuestionTypeEnum.SELECTION,
      selectionConfig,
      selections,
    };

    return this.fieldQuestionRepository.create(clonedPayload);
  }

  async createTextField(
    createFieldQuestionDto: CreateTextfieldFieldQuestionDto,
  ) {
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

  remove(id: FieldQuestion['id']) {
    return this.fieldQuestionRepository.remove(id);
  }
}
