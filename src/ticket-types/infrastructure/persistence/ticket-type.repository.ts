import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { TicketType } from '../../domain/ticket-type';
import { findOptions } from 'src/utils/types/fine-options.type';

export abstract class TicketTypeRepository {
  abstract create(
    data: Omit<
      TicketType,
      'id' | 'name' | 'description' | 'ticket' | 'createdAt' | 'updatedAt'
    >,
  ): Promise<TicketType>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<TicketType>>;

  abstract findById(
    id: TicketType['id'],
    options?: findOptions,
  ): Promise<NullableType<TicketType>>;

  abstract update(
    id: TicketType['id'],
    payload: DeepPartial<TicketType>,
  ): Promise<TicketType | null>;

  abstract remove(id: TicketType['id']): Promise<void>;
}
