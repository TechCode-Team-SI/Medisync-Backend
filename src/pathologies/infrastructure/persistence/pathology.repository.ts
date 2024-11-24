import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Pathology } from '../../domain/pathology';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import {
  FilterPathologiesDto,
  SortPathologiesDto,
} from 'src/pathologies/dto/find-all-pathologies.dto';

export abstract class PathologyRepository extends BaseRepository {
  abstract create(
    data: Omit<Pathology, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Pathology>;

  abstract createMultiple(
    data: Omit<Pathology, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<Pathology[]>;

  abstract findAllWithNames(
    names: string[],
    options?: findOptions,
  ): Promise<Pathology[]>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortPathologiesDto[] | null;
    filterOptions?: FilterPathologiesDto | null;
  }): Promise<PaginationResponseDto<Pathology>>;

  abstract findById(
    id: Pathology['id'],
    options?: findOptions,
  ): Promise<NullableType<Pathology>>;

  abstract findManyByIds(
    ids: Pathology['id'][],
    options?: findOptions,
  ): Promise<Pathology[]>;

  abstract update(
    id: Pathology['id'],
    payload: DeepPartial<Pathology>,
  ): Promise<Pathology | null>;

  abstract remove(id: Pathology['id']): Promise<void>;
}
