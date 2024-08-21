import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiagnosticEntity } from '../entities/diagnostic.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Diagnostic } from '../../../../domain/diagnostic';
import { DiagnosticRepository } from '../../diagnostic.repository';
import { DiagnosticMapper } from '../mappers/diagnostic.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/diagnostics/diagnostics.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class DiagnosticRelationalRepository implements DiagnosticRepository {
  constructor(
    @InjectRepository(DiagnosticEntity)
    private readonly diagnosticRepository: Repository<DiagnosticEntity>,
  ) {}

  private relations = [];

  async create(data: Diagnostic): Promise<Diagnostic> {
    const persistenceModel = DiagnosticMapper.toPersistence(data);
    const newEntity = await this.diagnosticRepository.save(
      this.diagnosticRepository.create(persistenceModel),
    );
    return DiagnosticMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Diagnostic>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const [entities, count] = await this.diagnosticRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
    });
    const items = entities.map((entity) => DiagnosticMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'diagnostics',
      },
    );
  }

  async findById(
    id: Diagnostic['id'],
    options?: findOptions,
  ): Promise<NullableType<Diagnostic>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const entity = await this.diagnosticRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? DiagnosticMapper.toDomain(entity) : null;
  }

  async update(
    id: Diagnostic['id'],
    payload: Partial<Diagnostic>,
  ): Promise<Diagnostic> {
    const entity = await this.diagnosticRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.diagnosticRepository.save(
      this.diagnosticRepository.create(
        DiagnosticMapper.toPersistence({
          ...DiagnosticMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return DiagnosticMapper.toDomain(updatedEntity);
  }

  async remove(id: Diagnostic['id']): Promise<void> {
    await this.diagnosticRepository.delete(id);
  }
}
