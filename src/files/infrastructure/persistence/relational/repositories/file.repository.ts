import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../entities/file.entity';
import { Repository } from 'typeorm';
import { FileRepository } from '../../file.repository';

import { FileMapper } from '../mappers/file.mapper';
import { FileType } from '../../../../domain/file';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class FileRelationalRepository implements FileRepository {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  private relations = [];

  async create(data: FileType): Promise<FileType> {
    const persistenceModel = FileMapper.toPersistence(data);
    return this.fileRepository.save(
      this.fileRepository.create(persistenceModel),
    );
  }

  async findById(
    id: FileType['id'],
    options?: findOptions,
  ): Promise<NullableType<FileType>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const entity = await this.fileRepository.findOne({
      where: {
        id: id,
      },
      relations,
    });

    return entity ? FileMapper.toDomain(entity) : null;
  }
}
