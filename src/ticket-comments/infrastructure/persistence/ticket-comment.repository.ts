import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { TicketComment } from '../../domain/ticket-comment';

export abstract class TicketCommentRepository {
  abstract create(
    data: Omit<TicketComment, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TicketComment>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationResponseDto<TicketComment>>;

  abstract findById(
    id: TicketComment['id'],
  ): Promise<NullableType<TicketComment>>;

  abstract update(
    id: TicketComment['id'],
    payload: DeepPartial<TicketComment>,
  ): Promise<TicketComment | null>;

  abstract remove(id: TicketComment['id']): Promise<void>;
}
