import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { TicketComment } from '../../domain/ticket-comment';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';

export abstract class TicketCommentRepository extends BaseRepository {
  abstract create(
    data: Omit<TicketComment, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TicketComment>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<TicketComment>>;

  abstract findById(
    id: TicketComment['id'],
    options?: findOptions,
  ): Promise<NullableType<TicketComment>>;

  abstract update(
    id: TicketComment['id'],
    payload: DeepPartial<TicketComment>,
  ): Promise<TicketComment | null>;

  abstract remove(id: TicketComment['id']): Promise<void>;
}
