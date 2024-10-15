import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Treatment } from '../../domain/treatment';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import {
  FilterTreatmentsDto,
  SortTreatmentsDto,
} from 'src/treatments/dto/find-all-treatments.dto';

export abstract class TreatmentRepository extends BaseRepository {
  abstract create(
    data: Omit<Treatment, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Treatment>;

  abstract createMultiple(
    data: Omit<Treatment, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<Treatment[]>;

  abstract findAllWithNames(
    names: string[],
    options?: findOptions,
  ): Promise<Treatment[]>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortTreatmentsDto[] | null;
    filterOptions?: FilterTreatmentsDto | null;
  }): Promise<PaginationResponseDto<Treatment>>;

  abstract findManyByIds(
    ids: Treatment['id'][],
    options?: findOptions,
  ): Promise<Treatment[]>;

  abstract findById(
    id: Treatment['id'],
    options?: findOptions,
  ): Promise<NullableType<Treatment>>;

  abstract update(
    id: Treatment['id'],
    payload: DeepPartial<Treatment>,
  ): Promise<Treatment | null>;

  abstract remove(id: Treatment['id']): Promise<void>;
}
