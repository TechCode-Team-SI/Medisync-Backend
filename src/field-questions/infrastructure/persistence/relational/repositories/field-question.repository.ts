import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FieldQuestionEntity } from '../entities/field-question.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { FieldQuestion } from '../../../../domain/field-question';
import { FieldQuestionRepository } from '../../field-question.repository';
import { FieldQuestionMapper } from '../mappers/field-question.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/field-questions/field-questions.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class FieldQuestionRelationalRepository
  implements FieldQuestionRepository
{
  constructor(
    @InjectRepository(FieldQuestionEntity)
    private readonly fieldQuestionRepository: Repository<FieldQuestionEntity>,
  ) {}

  private relations = ['selectionConfig', 'selections'];

  async create(data: FieldQuestion): Promise<FieldQuestion> {
    const persistenceModel = FieldQuestionMapper.toPersistence(data);
    const newEntity = await this.fieldQuestionRepository.save(
      this.fieldQuestionRepository.create(persistenceModel),
    );
    return FieldQuestionMapper.toDomain(newEntity);
  }

  async createMultiple(data: FieldQuestion[]): Promise<FieldQuestion[]> {
    const entities = data.map((item) => {
      const persistenceModel = FieldQuestionMapper.toPersistence(item);
      return this.fieldQuestionRepository.create(persistenceModel);
    });
    const newEntities = await this.fieldQuestionRepository.save(entities);
    return newEntities.map((entity) => FieldQuestionMapper.toDomain(entity));
  }

  async findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<FieldQuestion>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const [entities, count] = await this.fieldQuestionRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
    });
    const items = entities.map((entity) =>
      FieldQuestionMapper.toDomain(entity),
    );

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'field-questions',
      },
    );
  }

  async findById(
    id: FieldQuestion['id'],
    options?: findOptions,
  ): Promise<NullableType<FieldQuestion>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const entity = await this.fieldQuestionRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? FieldQuestionMapper.toDomain(entity) : null;
  }

  async findAllBySlug(
    slugs: FieldQuestion['slug'][],
    options?: findOptions,
  ): Promise<FieldQuestion[]> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const entities = await this.fieldQuestionRepository.find({
      where: { slug: In(slugs) },
      relations,
    });

    return entities.map((entity) => FieldQuestionMapper.toDomain(entity));
  }

  async findBySlug(
    slug: FieldQuestion['slug'],
    options?: findOptions,
  ): Promise<NullableType<FieldQuestion>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const entity = await this.fieldQuestionRepository.findOne({
      where: { slug },
      relations,
    });

    return entity ? FieldQuestionMapper.toDomain(entity) : null;
  }

  async update(
    id: FieldQuestion['id'],
    payload: Partial<FieldQuestion>,
  ): Promise<FieldQuestion> {
    const entity = await this.fieldQuestionRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.fieldQuestionRepository.save(
      this.fieldQuestionRepository.create(
        FieldQuestionMapper.toPersistence({
          ...FieldQuestionMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return FieldQuestionMapper.toDomain(updatedEntity);
  }

  async remove(id: FieldQuestion['id']): Promise<void> {
    await this.fieldQuestionRepository.delete(id);
  }
}
