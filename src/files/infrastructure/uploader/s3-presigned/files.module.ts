import { S3Client } from '@aws-sdk/client-s3';
import { Module, UnprocessableEntityException } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import multerS3 from 'multer-s3';
import { FilesS3PresignedController } from './files.controller';

import { exceptionResponses } from 'src/files/files.messages';
import { AllConfigType } from '../../../../config/config.type';
import { RelationalFilePersistenceModule } from '../../persistence/relational/relational-persistence.module';
import { FilesS3PresignedService } from './files.service';

const infrastructurePersistenceModule = RelationalFilePersistenceModule;

@Module({
  imports: [
    infrastructurePersistenceModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfigType>) => {
        const s3 = new S3Client({
          region: configService.get('file.awsS3Region', { infer: true }),
          endpoint: configService.get('file.awsS3Endpoint', { infer: true }),
          forcePathStyle: true,
          credentials: {
            accessKeyId: configService.getOrThrow('file.accessKeyId', {
              infer: true,
            }),
            secretAccessKey: configService.getOrThrow('file.secretAccessKey', {
              infer: true,
            }),
          },
        });

        return {
          fileFilter: (request, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
              return callback(
                new UnprocessableEntityException(
                  exceptionResponses.CantUploadFileType,
                ),
                false,
              );
            }

            callback(null, true);
          },
          storage: multerS3({
            s3: s3,
            bucket: '',
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (request, file, callback) => {
              callback(
                null,
                `${randomStringGenerator()}.${file.originalname
                  .split('.')
                  .pop()
                  ?.toLowerCase()}`,
              );
            },
          }),
          limits: {
            fileSize: configService.get('file.maxFileSize', { infer: true }),
          },
        };
      },
    }),
  ],
  controllers: [FilesS3PresignedController],
  providers: [ConfigModule, ConfigService, FilesS3PresignedService],
  exports: [FilesS3PresignedService],
})
export class FilesS3PresignedModule {}
