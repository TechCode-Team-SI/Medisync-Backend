import { Injectable } from '@nestjs/common';

import { FileRepository } from './infrastructure/persistence/file.repository';
import { FileType } from './domain/file';
import { NullableType } from '../utils/types/nullable.type';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class FilesService {
  constructor(private readonly fileRepository: FileRepository) {}

  findById(
    id: FileType['id'],
    options?: findOptions,
  ): Promise<NullableType<FileType>> {
    return this.fileRepository.findById(id, options);
  }
}
