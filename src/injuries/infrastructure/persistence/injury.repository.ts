import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Injury } from '../../domain/injury';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import {
  FilterInjuriesDto,
  SortInjuriesDto,
} from 'src/injuries/dto/find-all-injuries.dto';

export abstract class InjuryRepository extends BaseRepository {
  abstract create(
    data: Omit<Injury, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Injury>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortInjuriesDto[] | null;
    filterOptions?: FilterInjuriesDto | null;
  }): Promise<PaginationResponseDto<Injury>>;

  abstract findManyByIds(
    ids: Injury['id'][],
    options?: findOptions,
  ): Promise<Injury[]>;

  abstract findById(
    id: Injury['id'],
    options?: findOptions,
  ): Promise<NullableType<Injury>>;

  abstract update(
    id: Injury['id'],
    payload: DeepPartial<Injury>,
  ): Promise<Injury | null>;

  abstract remove(id: Injury['id']): Promise<void>;
}
