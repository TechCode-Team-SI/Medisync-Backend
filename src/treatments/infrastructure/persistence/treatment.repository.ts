import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { treatment } from '../../domain/treatment';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import { SorttreatmentsDto } from 'src/treatments/dto/find-all-treatments.dto';

export abstract class treatmentRepository extends BaseRepository {
  abstract create(
    data: Omit<treatment, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<treatment>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SorttreatmentsDto[] | null;
  }): Promise<PaginationResponseDto<treatment>>;

  abstract findById(
    id: treatment['id'],
    options?: findOptions,
  ): Promise<NullableType<treatment>>;

  abstract update(
    id: treatment['id'],
    payload: DeepPartial<treatment>,
  ): Promise<treatment | null>;

  abstract remove(id: treatment['id']): Promise<void>;
}
