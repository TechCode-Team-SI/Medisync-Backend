import { BaseRepository } from 'src/common/base.repository';
import { RequestFormatted } from 'src/requests/domain/request-formatted';
import {
  FilterRequestDto,
  SortRequestDto,
} from 'src/requests/dto/find-all-requests.dto';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { findOptions } from 'src/utils/types/fine-options.type';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Request } from '../../domain/request';

export abstract class RequestRepository extends BaseRepository {
  abstract create(
    data: Omit<Request, 'id' | 'createdAt' | 'updatedAt' | 'rating'>,
  ): Promise<Request>;

  abstract findAllMinimalWithPagination(options: {
    paginationOptions: IPaginationOptions;
    sortOptions?: SortRequestDto[] | null;
    filterOptions?: FilterRequestDto | null;
  }): Promise<PaginationResponseDto<Request>>;

  abstract findById(
    id: Request['id'],
    options?: findOptions & { withSpecialty?: boolean; withMedic?: boolean },
  ): Promise<NullableType<Request>>;

  abstract findRating(id: Request['id']): Promise<NullableType<Request>>;

  abstract findByIdFormatted(
    id: Request['id'],
  ): Promise<NullableType<RequestFormatted>>;

  abstract update(
    id: Request['id'],
    payload: DeepPartial<Request>,
  ): Promise<Request | null>;

  abstract remove(id: Request['id']): Promise<void>;
}
