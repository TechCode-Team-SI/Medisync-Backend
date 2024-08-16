import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { MedicalCenter } from '../../domain/medical-center';
import { findOptions } from 'src/utils/types/fine-options.type';

export abstract class MedicalCenterRepository {
  abstract create(
    data: Omit<MedicalCenter, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<MedicalCenter>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<MedicalCenter>>;

  abstract findById(
    id: MedicalCenter['id'],
    options?: findOptions,
  ): Promise<NullableType<MedicalCenter>>;

  abstract update(
    id: MedicalCenter['id'],
    payload: DeepPartial<MedicalCenter>,
  ): Promise<MedicalCenter | null>;

  abstract remove(id: MedicalCenter['id']): Promise<void>;
}
