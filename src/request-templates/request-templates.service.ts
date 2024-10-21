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
import { CreateMultipleRequestTemplateDto } from './dto/create-multiple-request-template.dto';
import {
  FilterRequestTemplateDto,
  SortRequestTemplateDto,
} from './dto/find-all-request-templates.dto';

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

  async createMultiple({ templates }: CreateMultipleRequestTemplateDto) {
    const slugs = templates.map((template) => {
      if (template.slug) return template.slug;
      return slugify(template.name);
    });
    const foundTemplates =
      await this.requestTemplateRepository.findAllBySlug(slugs);
    if (foundTemplates.length > 0) {
      throw new UnprocessableEntityException(
        exceptionResponses.RequestTemplateAlreadyExists,
      );
    }

    const payloads: {
      fields: RequestTemplateField[];
      slug: string;
      id?: string;
      name: string;
    }[] = [];

    for (const template of templates) {
      const fields = await Promise.all(
        template.fields.map(async (field) => {
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

      payloads.push({
        ...template,
        fields,
        slug: template.slug || slugify(template.name),
      });
    }

    return this.requestTemplateRepository.createMultiple(payloads);
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortRequestTemplateDto[] | null;
    filterOptions?: FilterRequestTemplateDto | null;
  }) {
    return this.requestTemplateRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
    });
  }

  findOne(id: RequestTemplate['id'], options?: findOptions) {
    return this.requestTemplateRepository.findById(id, options);
  }

  findBySpecialtyId(specialtyId: string, options?: findOptions) {
    return this.requestTemplateRepository.findBySpecialtyId(
      specialtyId,
      options,
    );
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
