import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketCommentEntity } from '../entities/ticket-comment.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { TicketComment } from '../../../../domain/ticket-comment';
import { TicketCommentRepository } from '../../ticket-comment.repository';
import { TicketCommentMapper } from '../mappers/ticket-comment.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/ticket-comments/ticket-comments.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class TicketCommentRelationalRepository
  implements TicketCommentRepository
{
  constructor(
    @InjectRepository(TicketCommentEntity)
    private readonly ticketCommentRepository: Repository<TicketCommentEntity>,
  ) {}

  private relations = [];

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
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<TicketComment>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const [entities, count] = await this.ticketCommentRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
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
    if (options?.minimal) relations = [];

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
