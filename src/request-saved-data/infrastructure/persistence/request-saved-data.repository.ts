import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { RequestSavedData } from '../../domain/request-saved-data';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import {
  FilterRequestSavedDataDto,
  SortRequestSavedDataDto,
} from 'src/request-saved-data/dto/find-all-request-saved-data.dto';

export abstract class RequestSavedDataRepository extends BaseRepository {
  abstract create(
    data: Omit<RequestSavedData, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<RequestSavedData>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    filterOptions?: FilterRequestSavedDataDto | null;
    sortOptions?: SortRequestSavedDataDto[] | null;
  }): Promise<PaginationResponseDto<RequestSavedData>>;

  abstract findById(
    id: RequestSavedData['id'],
    options?: findOptions,
  ): Promise<NullableType<RequestSavedData>>;

  abstract update(
    id: RequestSavedData['id'],
    payload: DeepPartial<RequestSavedData>,
  ): Promise<RequestSavedData | null>;

  abstract remove(id: RequestSavedData['id']): Promise<void>;
}
