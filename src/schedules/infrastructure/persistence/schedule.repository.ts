import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Schedule } from '../../domain/schedule';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import {
  FilterSchedulesDto,
  SortSchedulesDto,
} from 'src/schedules/dto/find-all-schedules.dto';

export abstract class ScheduleRepository extends BaseRepository {
  abstract create(
    data: Omit<Schedule, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Schedule>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortSchedulesDto[] | null;
    filterOptions?: FilterSchedulesDto | null;
  }): Promise<PaginationResponseDto<Schedule>>;

  abstract findById(
    id: Schedule['id'],
    options?: findOptions & { withEmployees?: boolean },
  ): Promise<NullableType<Schedule>>;

  abstract update(
    id: Schedule['id'],
    payload: DeepPartial<Schedule>,
  ): Promise<Schedule | null>;

  abstract remove(id: Schedule['id']): Promise<void>;
}
