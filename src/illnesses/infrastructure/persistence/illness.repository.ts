import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Illness } from '../../domain/illness';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import { SortIllnessesDto } from 'src/illnesses/dto/find-all-illnesses.dto';

export abstract class IllnessRepository extends BaseRepository {
  abstract create(
    data: Omit<Illness, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Illness>;

  abstract findManyByIds(
    ids: Illness['id'][],
    options?: findOptions,
  ): Promise<Illness[]>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortIllnessesDto[] | null;
  }): Promise<PaginationResponseDto<Illness>>;

  abstract findById(
    id: Illness['id'],
    options?: findOptions,
  ): Promise<NullableType<Illness>>;

  abstract update(
    id: Illness['id'],
    payload: DeepPartial<Illness>,
  ): Promise<Illness | null>;

  abstract remove(id: Illness['id']): Promise<void>;
}
