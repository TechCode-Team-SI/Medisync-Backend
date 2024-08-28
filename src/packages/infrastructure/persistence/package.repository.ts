import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Package } from '../../domain/package';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';

export abstract class PackageRepository extends BaseRepository {
  abstract create(
    data: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Package>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Package>>;

  abstract findAllBySlug(
    slugs: Package['slug'][],
    options?: findOptions,
  ): Promise<NullableType<Package[]>>;

  abstract findById(
    id: Package['id'],
    options?: findOptions,
  ): Promise<NullableType<Package>>;

  abstract update(
    id: Package['id'],
    payload: DeepPartial<Package>,
  ): Promise<Package | null>;

  abstract remove(id: Package['id']): Promise<void>;
}
