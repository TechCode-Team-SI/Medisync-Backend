import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import path from 'path';
import { exceptionResponses } from 'src/files/files.messages';
import { FileType } from '../../../domain/file';
import { FileRepository } from '../../persistence/file.repository';

@Injectable()
export class FilesS3Service {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly configService: ConfigService,
  ) {}

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

  async createInternal(filePath: string): Promise<{ file: FileType }> {
    const fileExists = fs.existsSync(path.resolve(filePath));
    if (!fileExists) {
      throw new UnprocessableEntityException(exceptionResponses.FileNotFound);
    }
    const file = fs.readFileSync(path.resolve(filePath));
    const ext = path.extname(path.resolve(filePath));
    const fileName = `${randomStringGenerator()}.${ext}`;
    const mimeType = 'image/jpg';

    const s3 = new S3Client({
      region: this.configService.get('file.awsS3Region', { infer: true }),
      endpoint: this.configService.get('file.awsS3Endpoint', { infer: true }),
      forcePathStyle: true,
      credentials: {
        accessKeyId: this.configService.getOrThrow('file.accessKeyId', {
          infer: true,
        }),
        secretAccessKey: this.configService.getOrThrow('file.secretAccessKey', {
          infer: true,
        }),
      },
    });
    const command = new PutObjectCommand({
      Bucket: this.configService.getOrThrow('file.awsDefaultS3Bucket', {
        infer: true,
      }),
      Key: fileName,
      Body: Buffer.from(file.buffer),
      ContentType: mimeType,
    });

    await s3.send(command);

    return {
      file: await this.fileRepository.create({
        path: fileName,
      }),
    };
  }
}
