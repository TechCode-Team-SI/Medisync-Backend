import { findOptions } from 'src/utils/types/fine-options.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { FileType } from '../../domain/file';

export abstract class FileRepository {
  abstract create(data: Omit<FileType, 'id'>): Promise<FileType>;

  abstract findById(
    id: FileType['id'],
    options?: findOptions,
  ): Promise<NullableType<FileType>>;
}
