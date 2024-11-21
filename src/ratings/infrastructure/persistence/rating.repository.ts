import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Rating } from '../../domain/rating';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';

export abstract class RatingRepository extends BaseRepository {
  abstract create(data: Omit<Rating, 'id'>): Promise<Rating>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Rating>>;

  abstract findById(
    id: Rating['id'],
    options?: findOptions,
  ): Promise<NullableType<Rating>>;

  abstract update(
    id: Rating['id'],
    payload: DeepPartial<Rating>,
  ): Promise<Rating | null>;

  abstract remove(id: Rating['id']): Promise<void>;
}
