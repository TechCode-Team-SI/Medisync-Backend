import { BaseRepository } from 'src/common/base.repository';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Installation } from '../../domain/installation';

export abstract class InstallationRepository extends BaseRepository {
  abstract create(
    data: Omit<Installation, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Installation>;

  abstract findOne(): Promise<NullableType<Installation>>;

  abstract update(
    id: Installation['id'],
    payload: DeepPartial<Installation>,
  ): Promise<Installation | null>;
}
