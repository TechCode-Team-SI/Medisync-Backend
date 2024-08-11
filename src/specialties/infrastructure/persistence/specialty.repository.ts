import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Specialty } from '../../domain/specialty';
import { findOptions } from 'src/utils/types/fine-options.type';

type CreateSpecialty = Omit<
  Specialty,
  'id' | 'createdAt' | 'updatedAt' | 'isDisabled' | 'isGroup' | 'isPublic'
> &
  Partial<Pick<Specialty, 'isDisabled' | 'isGroup' | 'isPublic'>>;

export abstract class SpecialtyRepository {
  abstract create(data: CreateSpecialty): Promise<Specialty>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Specialty>>;

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
