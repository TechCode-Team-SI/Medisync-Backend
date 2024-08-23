import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { FieldQuestion } from '../../domain/field-question';
import { findOptions } from 'src/utils/types/fine-options.type';

export abstract class FieldQuestionRepository {
  abstract create(
    data: Omit<FieldQuestion, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FieldQuestion>;

  abstract createMultiple(
    data: Omit<FieldQuestion, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<FieldQuestion[]>;

  abstract findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<FieldQuestion>>;

  abstract findById(
    id: FieldQuestion['id'],
    options?: findOptions,
  ): Promise<NullableType<FieldQuestion>>;

  abstract findBySlug(
    slug: FieldQuestion['slug'],
    options?: findOptions,
  ): Promise<NullableType<FieldQuestion>>;

  abstract findAllBySlug(
    slugs: FieldQuestion['slug'][],
    options?: findOptions,
  ): Promise<FieldQuestion[]>;

  abstract update(
    id: FieldQuestion['id'],
    payload: DeepPartial<FieldQuestion>,
  ): Promise<FieldQuestion | null>;

  abstract remove(id: FieldQuestion['id']): Promise<void>;
}
