import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Symptom } from '../../domain/symptom';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import {
  FilterSymptomsDto,
  SortSymptomsDto,
} from 'src/symptoms/dto/find-all-symptoms.dto';

export abstract class SymptomRepository extends BaseRepository {
  abstract create(
    data: Omit<Symptom, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Symptom>;

  abstract createMultiple(
    data: Omit<Symptom, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<Symptom[]>;

  abstract findAllWithNames(
    names: string[],
    options?: findOptions,
  ): Promise<Symptom[]>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortSymptomsDto[] | null;
    filterOptions?: FilterSymptomsDto | null;
  }): Promise<PaginationResponseDto<Symptom>>;

  abstract findManyByIds(
    ids: Symptom['id'][],
    options?: findOptions,
  ): Promise<Symptom[]>;

  abstract findById(
    id: Symptom['id'],
    options?: findOptions,
  ): Promise<NullableType<Symptom>>;

  abstract update(
    id: Symptom['id'],
    payload: DeepPartial<Symptom>,
  ): Promise<Symptom | null>;

  abstract remove(id: Symptom['id']): Promise<void>;
}
