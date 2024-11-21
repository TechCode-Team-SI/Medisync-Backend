import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { DaysOff } from '../../domain/days-off';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import {
  FilterDaysOffsDto,
  SortDaysOffsDto,
} from 'src/days-offs/dto/find-all-days-offs.dto';

export abstract class DaysOffRepository extends BaseRepository {
  abstract create(
    data: Omit<DaysOff, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<DaysOff>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortDaysOffsDto[] | null;
    filterOptions?: FilterDaysOffsDto | null;
  }): Promise<PaginationResponseDto<DaysOff>>;

  abstract findAllDaysOffs(props: {
    employeeProfileId?: string | null;
    agendaId?: string | null;
    specialtyId?: string | null;
    startDate: Date;
    endDate: Date;
  }): Promise<string[]>;

  abstract findById(
    id: DaysOff['id'],
    options?: findOptions,
  ): Promise<NullableType<DaysOff>>;

  abstract update(
    id: DaysOff['id'],
    payload: DeepPartial<DaysOff>,
  ): Promise<DaysOff | null>;

  abstract remove(id: DaysOff['id']): Promise<void>;
}
