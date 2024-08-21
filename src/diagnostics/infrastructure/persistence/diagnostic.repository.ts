import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Diagnostic } from '../../domain/diagnostic';
import { findOptions } from 'src/utils/types/fine-options.type';

export abstract class DiagnosticRepository {
  abstract create(
    data: Omit<Diagnostic, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Diagnostic>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Diagnostic>>;

  abstract findById(
    id: Diagnostic['id'],
    options?: findOptions,
  ): Promise<NullableType<Diagnostic>>;

  abstract update(
    id: Diagnostic['id'],
    payload: DeepPartial<Diagnostic>,
  ): Promise<Diagnostic | null>;

  abstract remove(id: Diagnostic['id']): Promise<void>;
}
