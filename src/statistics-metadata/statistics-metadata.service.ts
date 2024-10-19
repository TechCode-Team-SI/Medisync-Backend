import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateStatisticsMetadataDto } from './dto/create-statistics-metadata.dto';
import { UpdateStatisticsMetadataDto } from './dto/update-statistics-metadata.dto';
import { StatisticsMetadataRepository } from './infrastructure/persistence/statistics-metadata.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { StatisticsMetadata } from './domain/statistics-metadata';
import { findOptions } from 'src/utils/types/fine-options.type';
import { SortStatisticsMetadataDto } from 'src/statistics-metadata/dto/find-all-statistics-metadata.dto';
import { FieldQuestionRepository } from 'src/field-questions/infrastructure/persistence/field-question.repository';
import { FilterAvailableFieldQuestions } from './dto/get-avalable-field-questions.dto';
import { FilterAvailableSpecialties } from './dto/get-available-specialties.dto';

@Injectable()
export class StatisticsMetadataService {
  constructor(
    private readonly statisticsMetadataRepository: StatisticsMetadataRepository,
    private readonly fieldQuestionRepository: FieldQuestionRepository,
  ) {}

  async create(createStatisticsMetadataDto: CreateStatisticsMetadataDto) {
    console.log(createStatisticsMetadataDto.fieldQuestion.id);
    const fieldQuestion = await this.fieldQuestionRepository.findById(
      createStatisticsMetadataDto.fieldQuestion.id,
    );
    if (!fieldQuestion) {
      throw new UnprocessableEntityException('Field question not found');
    }
    return this.statisticsMetadataRepository.create({
      ...createStatisticsMetadataDto,
      fieldQuestion,
    });
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortStatisticsMetadataDto[] | null;
  }) {
    return this.statisticsMetadataRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
    });
  }

  findOne(id: StatisticsMetadata['id'], options?: findOptions) {
    return this.statisticsMetadataRepository.findById(id, options);
  }

  update(
    id: StatisticsMetadata['id'],
    updateStatisticsMetadataDto: UpdateStatisticsMetadataDto,
  ) {
    return this.statisticsMetadataRepository.update(
      id,
      updateStatisticsMetadataDto,
    );
  }

  remove(id: StatisticsMetadata['id']) {
    return this.statisticsMetadataRepository.remove(id);
  }

  getAvailableSpecialtiesForGraph(
    fieldQuestionId: string,
    {
      paginationOptions,
      filterOptions,
    }: {
      paginationOptions: IPaginationOptions;
      filterOptions?: FilterAvailableSpecialties | null;
    },
  ) {
    return this.statisticsMetadataRepository.getAvailableSpecialtiesForGraph(
      fieldQuestionId,
      {
        paginationOptions,
        filterOptions,
      },
    );
  }

  getAvailableFieldQuestionsForGraph({
    paginationOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    filterOptions?: FilterAvailableFieldQuestions | null;
  }) {
    return this.statisticsMetadataRepository.getAvailableFieldQuestionsForGraph(
      {
        paginationOptions,
        filterOptions,
      },
    );
  }
}
