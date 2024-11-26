import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { exceptionResponses } from 'src/diagnostics/diagnostics.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { DataSource, FindOptionsRelations, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Diagnostic } from '../../../../domain/diagnostic';
import { DiagnosticRepository } from '../../diagnostic.repository';
import { DiagnosticEntity } from '../entities/diagnostic.entity';
import { DiagnosticMapper } from '../mappers/diagnostic.mapper';

@Injectable({ scope: Scope.REQUEST })
export class DiagnosticRelationalRepository
  extends BaseRepository
  implements DiagnosticRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get diagnosticRepository(): Repository<DiagnosticEntity> {
    return this.getRepository(DiagnosticEntity);
  }

  private relations: FindOptionsRelations<DiagnosticEntity> = {
    injuries: true,
    pathologies: true,
    illnesses: true,
    treatments: true,
    symptoms: true,
  };

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
    if (options?.minimal) relations = {};

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
    if (options?.minimal) relations = {};

    const entity = await this.diagnosticRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? DiagnosticMapper.toDomain(entity) : null;
  }

  async findByRequestId(requestId: string): Promise<NullableType<Diagnostic>> {
    const relations = this.relations;

    const entity = await this.diagnosticRepository.findOne({
      where: { request: { id: requestId } },
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
