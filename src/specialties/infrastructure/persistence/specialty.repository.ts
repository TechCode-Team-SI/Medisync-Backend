import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { findOptions } from 'src/utils/types/fine-options.type';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Specialty } from '../../domain/specialty';
import { BaseRepository } from 'src/common/base.repository';

type CreateSpecialty = Omit<
  Specialty,
  'id' | 'createdAt' | 'updatedAt' | 'isDisabled' | 'isGroup' | 'isPublic'
> &
  Partial<Pick<Specialty, 'isDisabled' | 'isGroup' | 'isPublic'>>;

export abstract class SpecialtyRepository extends BaseRepository {
  abstract create(data: CreateSpecialty): Promise<Specialty>;

  abstract createMultiple(data: CreateSpecialty[]): Promise<Specialty[]>;

  abstract findAllWithPagination(options: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    employeeId?: string;
  }): Promise<PaginationResponseDto<Specialty>>;

  abstract findAllWithNames(
    names: Specialty['name'][],
    options?: findOptions,
  ): Promise<Specialty[]>;

  abstract findById(
    id: Specialty['id'],
    options?: findOptions,
  ): Promise<NullableType<Specialty>>;

  abstract update(
    id: Specialty['id'],
    payload: DeepPartial<Specialty>,
  ): Promise<Specialty | null>;

  abstract remove(id: Specialty['id']): Promise<void>;
}
