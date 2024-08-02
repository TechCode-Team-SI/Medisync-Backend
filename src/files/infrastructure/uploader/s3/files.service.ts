import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { exceptionResponses } from 'src/files/files.messages';
import { FileType } from '../../../domain/file';
import { FileRepository } from '../../persistence/file.repository';

@Injectable()
export class FilesS3Service {
  constructor(private readonly fileRepository: FileRepository) {}

  async create(file: Express.MulterS3.File): Promise<{ file: FileType }> {
    if (!file) {
      throw new UnprocessableEntityException(exceptionResponses.SelectFile);
    }

    return {
      file: await this.fileRepository.create({
        path: file.key,
      }),
    };
  }
}
