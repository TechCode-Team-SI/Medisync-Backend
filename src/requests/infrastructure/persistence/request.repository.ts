import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Request } from '../../domain/request';
import { findOptions } from 'src/utils/types/fine-options.type';
import { RequestFormatted } from 'src/requests/domain/request-formatted';

export abstract class RequestRepository {
  abstract create(
    data: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Request>;

  abstract findAllMinimalWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PaginationResponseDto<Request>>;

  abstract findById(
    id: Request['id'],
    options?: findOptions,
  ): Promise<NullableType<Request>>;

  abstract findByIdFormatted(
    id: Request['id'],
  ): Promise<NullableType<RequestFormatted>>;

  abstract update(
    id: Request['id'],
    payload: DeepPartial<Request>,
  ): Promise<Request | null>;

  abstract remove(id: Request['id']): Promise<void>;
}
