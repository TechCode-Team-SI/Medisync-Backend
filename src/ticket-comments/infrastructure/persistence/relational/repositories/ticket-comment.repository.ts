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

@Injectable()
export class TicketCommentRelationalRepository
  implements TicketCommentRepository
{
  constructor(
    @InjectRepository(TicketCommentEntity)
    private readonly ticketCommentRepository: Repository<TicketCommentEntity>,
  ) {}

  async create(data: TicketComment): Promise<TicketComment> {
    const persistenceModel = TicketCommentMapper.toPersistence(data);
    const newEntity = await this.ticketCommentRepository.save(
      this.ticketCommentRepository.create(persistenceModel),
    );
    return TicketCommentMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationResponseDto<TicketComment>> {
    const [entities, count] = await this.ticketCommentRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
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
  ): Promise<NullableType<TicketComment>> {
    const entity = await this.ticketCommentRepository.findOne({
      where: { id },
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
