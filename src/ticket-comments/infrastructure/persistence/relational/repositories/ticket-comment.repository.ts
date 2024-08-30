import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { exceptionResponses } from 'src/ticket-comments/ticket-comments.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { TicketComment } from '../../../../domain/ticket-comment';
import { TicketCommentRepository } from '../../ticket-comment.repository';
import { TicketCommentEntity } from '../entities/ticket-comment.entity';
import { TicketCommentMapper } from '../mappers/ticket-comment.mapper';

@Injectable({ scope: Scope.REQUEST })
export class TicketCommentRelationalRepository
  extends BaseRepository
  implements TicketCommentRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get ticketCommentRepository(): Repository<TicketCommentEntity> {
    return this.getRepository(TicketCommentEntity);
  }

  private relations: FindOptionsRelations<TicketCommentEntity> = {};

  async create(data: TicketComment): Promise<TicketComment> {
    const persistenceModel = TicketCommentMapper.toPersistence(data);
    const newEntity = await this.ticketCommentRepository.save(
      this.ticketCommentRepository.create(persistenceModel),
    );
    return TicketCommentMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    ticketId,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    ticketId?: string;
  }): Promise<PaginationResponseDto<TicketComment>> {
    let where: FindOptionsWhere<TicketCommentEntity> = {};
    if (ticketId) {
      where = { ...where, ticket: { id: ticketId } };
    }

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.ticketCommentRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where,
      relations,
    });
    const items = entities.map((entity) =>
      TicketCommentMapper.toDomain(entity),
    );

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'ticket-comments',
      },
    );
  }

  async findById(
    id: TicketComment['id'],
    options?: findOptions,
  ): Promise<NullableType<TicketComment>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.ticketCommentRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? TicketCommentMapper.toDomain(entity) : null;
  }

  async update(
    id: TicketComment['id'],
    payload: Partial<TicketComment>,
  ): Promise<TicketComment> {
    const entity = await this.ticketCommentRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.ticketCommentRepository.save(
      this.ticketCommentRepository.create(
        TicketCommentMapper.toPersistence({
          ...TicketCommentMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TicketCommentMapper.toDomain(updatedEntity);
  }

  async remove(id: TicketComment['id']): Promise<void> {
    await this.ticketCommentRepository.delete(id);
  }
}
