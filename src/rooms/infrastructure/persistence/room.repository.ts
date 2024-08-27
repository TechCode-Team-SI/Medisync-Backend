import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Room } from '../../domain/room';
import { findOptions } from 'src/utils/types/fine-options.type';

export abstract class RoomRepository {
  abstract create(
    data: Omit<Room, 'id' | 'specialty' | 'employeeProfile'>,
  ): Promise<Room>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Room>>;

  abstract findById(
    id: Room['id'],
    options?: findOptions,
  ): Promise<NullableType<Room>>;

  abstract update(
    id: Room['id'],
    payload: DeepPartial<Room>,
  ): Promise<Room | null>;

  abstract remove(id: Room['id']): Promise<void>;
}
