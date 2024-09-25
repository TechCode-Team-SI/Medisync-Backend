import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Injury } from '../../domain/injury';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import { SortInjuriesDto } from 'src/injuries/dto/find-all-injuries.dto';

export abstract class InjuryRepository extends BaseRepository {
  abstract create(
    data: Omit<Injury, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Injury>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortInjuriesDto[] | null;
  }): Promise<PaginationResponseDto<Injury>>;

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
