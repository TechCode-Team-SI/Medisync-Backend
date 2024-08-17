import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { MedicalCenter } from '../../domain/medical-center';
import { findOptions } from 'src/utils/types/fine-options.type';

export abstract class MedicalCenterRepository {
  abstract create(data: Omit<MedicalCenter, 'id'>): Promise<MedicalCenter>;

  abstract findById(
    options?: findOptions,
  ): Promise<NullableType<MedicalCenter>>;

  abstract update(
    payload: DeepPartial<MedicalCenter>,
  ): Promise<MedicalCenter | null>;

  abstract remove(): Promise<void>;
}
