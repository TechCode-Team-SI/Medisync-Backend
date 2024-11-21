import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import fs from 'fs';
import path from 'path';
import { exceptionResponses } from 'src/files/files.messages';
import { FileType } from '../../../domain/file';
import { FileRepository } from '../../persistence/file.repository';
import { resizeImage } from 'src/utils/resize-image';

@Injectable()
export class FilesLocalService {
  constructor(
    private readonly configService: ConfigService,
    private readonly fileRepository: FileRepository,
  ) {}

  async create(file: Express.Multer.File): Promise<{ file: FileType }> {
    if (!file) {
      throw new UnprocessableEntityException(exceptionResponses.SelectFile);
    }

    await resizeImage(file.path);

    return {
      file: await this.fileRepository.create({
        path: `/${this.configService.get('app.apiPrefix', {
          infer: true,
        })}/v1/${file.path}`,
      }),
    };
  }

  async createInternal(filePath: string): Promise<{ file: FileType }> {
    const fileExists = fs.existsSync(path.resolve(filePath));
    if (!fileExists) {
      throw new UnprocessableEntityException(exceptionResponses.FileNotFound);
    }
    const file = fs.readFileSync(path.resolve(filePath));
    const ext = path.extname(path.resolve(filePath));
    const fileName = `${randomStringGenerator()}${ext}`;

    const uploadPath = path.join('files', fileName);
    // Save the file to the local directory
    fs.writeFileSync(uploadPath, file);

    return {
      file: await this.fileRepository.create({
        path: `/${this.configService.get('app.apiPrefix', {
          infer: true,
        })}/v1/files/${fileName}`,
      }),
    };
  }
}
