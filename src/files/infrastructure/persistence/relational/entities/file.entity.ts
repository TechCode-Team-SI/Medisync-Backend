import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// We use class-transformer in ORM entity and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an ORM entity directly in response.
import { Transform } from 'class-transformer';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AppConfig } from '../../../../../config/app-config.type';
import appConfig from '../../../../../config/app.config';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { FileConfig, FileDriver } from '../../../../config/file-config.type';
import fileConfig from '../../../../config/file.config';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'file' })
export class FileEntity extends EntityRelationalHelper {
  @ApiProperty({
    type: String,
    example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    example: 'https://example.com/path/to/file.jpg',
  })
  @Column()
  @Transform(
    ({ value }) => {
      const config = fileConfig() as FileConfig;
      if (config.driver === FileDriver.LOCAL) {
        return (appConfig() as AppConfig).backendDomain + value;
      } else if (
        [FileDriver.S3_PRESIGNED, FileDriver.S3].includes(config.driver)
      ) {
        const s3 = new S3Client({
          region: config.awsS3Region ?? '',
          endpoint: config.awsS3Endpoint,
          forcePathStyle: true,
          credentials: {
            accessKeyId: config.accessKeyId ?? '',
            secretAccessKey: config.secretAccessKey ?? '',
          },
        });

        const command = new GetObjectCommand({
          Bucket: config.awsDefaultS3Bucket ?? '',
          Key: value,
        });

        return getSignedUrl(s3, command, { expiresIn: 3600 });
      }

      return value;
    },
    {
      toPlainOnly: true,
    },
  )
  path: string;
}
