import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Instructions } from '../../domain/instructions';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';

export abstract class InstructionsRepository extends BaseRepository {
  abstract create(
    data: Omit<Instructions, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Instructions>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Instructions>>;

  abstract findById(
    id: Instructions['id'],
    options?: findOptions,
  ): Promise<NullableType<Instructions>>;

  abstract update(
    id: Instructions['id'],
    payload: DeepPartial<Instructions>,
  ): Promise<Instructions | null>;

  abstract findByRequestId(
    requestId: string,
  ): Promise<NullableType<Instructions>>;

  abstract remove(id: Instructions['id']): Promise<void>;
}
