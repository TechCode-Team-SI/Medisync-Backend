import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateRequestTemplateDto } from './dto/create-request-template.dto';
import { UpdateRequestTemplateDto } from './dto/update-request-template.dto';
import { RequestTemplateRepository } from './infrastructure/persistence/request-template.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { RequestTemplate } from './domain/request-template';
import { findOptions } from 'src/utils/types/fine-options.type';
import { RequestTemplateField } from './domain/request-template-field';
import { FieldQuestionMapper } from 'src/field-questions/infrastructure/persistence/relational/mappers/field-question.mapper';
import { FieldQuestionsService } from 'src/field-questions/field-questions.service';
import { exceptionResponses } from './request-templates.messages';
import { slugify } from 'src/utils/utils';

@Injectable()
export class RequestTemplatesService {
  constructor(
    private readonly requestTemplateRepository: RequestTemplateRepository,
    private readonly fieldQuestionsService: FieldQuestionsService,
  ) {}

  async create(createRequestTemplateDto: CreateRequestTemplateDto) {
    const slug = slugify(createRequestTemplateDto.name);
    const requestTemplate =
      await this.requestTemplateRepository.findBySlug(slug);
    if (requestTemplate) {
      throw new UnprocessableEntityException(
        exceptionResponses.RequestTemplateAlreadyExists,
      );
    }

    const fields = await Promise.all(
      createRequestTemplateDto.fields.map(async (field) => {
        const fieldQuestion = await this.fieldQuestionsService.findOne(
          field.fieldQuestion.id,
        );

        if (!fieldQuestion) {
          throw new UnprocessableEntityException(
            exceptionResponses.FieldQuestionNotExists,
          );
        }

        const requestTemplateField = new RequestTemplateField();
        requestTemplateField.order = field.order;
        requestTemplateField.fieldQuestion =
          FieldQuestionMapper.toPersistence(fieldQuestion);

        return requestTemplateField;
      }),
    );

    const clonedPayload = {
      ...createRequestTemplateDto,
      fields,
      slug,
    };

    return this.requestTemplateRepository.create(clonedPayload);
  }

  findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }) {
    return this.requestTemplateRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
    });
  }

  findOne(id: RequestTemplate['id'], options?: findOptions) {
    return this.requestTemplateRepository.findById(id, options);
  }

  update(
    id: RequestTemplate['id'],
    updateRequestTemplateDto: UpdateRequestTemplateDto,
  ) {
    return this.requestTemplateRepository.update(id, updateRequestTemplateDto);
  }

  remove(id: RequestTemplate['id']) {
    return this.requestTemplateRepository.remove(id);
  }
}
