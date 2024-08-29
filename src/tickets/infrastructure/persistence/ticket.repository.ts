import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Ticket } from '../../domain/ticket';
import { TicketTypeEnum } from 'src/tickets/tickets.enum';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';

type CreateTicketType = Omit<
  Ticket,
  'id' | 'createdAt' | 'updatedAt' | 'status' | 'type' | 'comments'
> &
  Partial<Pick<Ticket, 'status' | 'type'>>;

export abstract class TicketRepository extends BaseRepository {
  abstract create(data: CreateTicketType): Promise<Ticket>;

  abstract findAllWithPagination(options: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    type?: TicketTypeEnum;
    createdById?: string;
  }): Promise<PaginationResponseDto<Ticket>>;

  abstract findById(
    id: Ticket['id'],
    options?: findOptions,
  ): Promise<NullableType<Ticket>>;

  abstract update(
    id: Ticket['id'],
    payload: DeepPartial<Ticket>,
  ): Promise<Ticket | null>;

  abstract remove(id: Ticket['id']): Promise<void>;
}
