import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Agenda } from '../../domain/agenda';
import { findOptions } from 'src/utils/types/fine-options.type';
import { BaseRepository } from 'src/common/base.repository';
import {
  FilterAgendaDto,
  SortAgendasDto,
} from 'src/agendas/dto/find-all-agendas.dto';

export abstract class AgendaRepository extends BaseRepository {
  abstract create(
    data: Omit<Agenda, 'id' | 'slotTime' | 'createdAt' | 'updatedAt'> &
      Partial<Pick<Agenda, 'slotTime'>>,
  ): Promise<Agenda>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortAgendasDto[] | null;
    filterOptions?: FilterAgendaDto | null;
  }): Promise<PaginationResponseDto<Agenda>>;

  abstract findById(
    id: Agenda['id'],
    options?: findOptions,
  ): Promise<NullableType<Agenda>>;

  abstract update(
    id: Agenda['id'],
    payload: DeepPartial<Agenda>,
  ): Promise<Agenda | null>;

  abstract remove(id: Agenda['id']): Promise<void>;
}
