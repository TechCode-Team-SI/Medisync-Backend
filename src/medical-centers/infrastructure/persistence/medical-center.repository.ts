import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { MedicalCenter } from '../../domain/medical-center';
import { findOptions } from 'src/utils/types/fine-options.type';

export abstract class MedicalCenterRepository {
  abstract create(
    data: Omit<MedicalCenter, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<MedicalCenter>;

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
