import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { StatisticsMetadata } from '../../domain/statistics-metadata';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import { SortStatisticsMetadataDto } from 'src/statistics-metadata/dto/find-all-statistics-metadata.dto';
import { Tart } from 'src/statistics-metadata/statistics-metadata.type';

export abstract class StatisticsMetadataRepository extends BaseRepository {
  abstract create(
    data: Omit<StatisticsMetadata, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<StatisticsMetadata>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortStatisticsMetadataDto[] | null;
  }): Promise<PaginationResponseDto<StatisticsMetadata>>;

  abstract findAll({
    options,
  }: {
    options?: findOptions;
    sortOptions?: SortStatisticsMetadataDto[] | null;
  }): Promise<StatisticsMetadata[]>;

  abstract findById(
    id: StatisticsMetadata['id'],
    options?: findOptions,
  ): Promise<NullableType<StatisticsMetadata>>;

  abstract update(
    id: StatisticsMetadata['id'],
    payload: DeepPartial<StatisticsMetadata>,
  ): Promise<StatisticsMetadata | null>;

  abstract remove(id: StatisticsMetadata['id']): Promise<void>;

  abstract genTartMetadata(metadata: StatisticsMetadata): Promise<Tart>;
}
