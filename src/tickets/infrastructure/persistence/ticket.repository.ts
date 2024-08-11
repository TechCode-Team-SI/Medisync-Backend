import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Ticket } from '../../domain/ticket';
import { TicketTypeEnum } from 'src/tickets/tickets.enum';

type CreateTicketType = Omit<
  Ticket,
  'id' | 'createdAt' | 'updatedAt' | 'status' | 'type'
> &
  Partial<Pick<Ticket, 'status' | 'type'>>;

export abstract class TicketRepository {
  abstract create(data: CreateTicketType): Promise<Ticket>;

  abstract findAllWithPagination({
    paginationOptions,
    type,
  }: {
    paginationOptions: IPaginationOptions;
    type?: TicketTypeEnum;
  }): Promise<PaginationResponseDto<Ticket>>;

  abstract findById(id: Ticket['id']): Promise<NullableType<Ticket>>;

  abstract update(
    id: Ticket['id'],
    payload: DeepPartial<Ticket>,
  ): Promise<Ticket | null>;

  abstract remove(id: Ticket['id']): Promise<void>;
}
