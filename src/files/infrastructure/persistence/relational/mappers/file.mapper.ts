import { FileType } from '../../../../domain/file';
import { FileEntity } from '../entities/file.entity';

export class FileMapper {
  static toDomain(raw: FileEntity): FileType {
    const domainEntity = new FileType();
    domainEntity.id = raw.id;
    domainEntity.path = raw.path;
    return domainEntity;
  }

  static toDomainFromObject(
    raw: Partial<{ id: string; path: string }>,
  ): FileType {
    const domainEntity = new FileType();
    if (raw.id) domainEntity.id = raw.id;
    if (raw.path) domainEntity.path = raw.path;
    return domainEntity;
  }

  static toPersistence(domainEntity: FileType): FileEntity {
    const persistenceEntity = new FileEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.path = domainEntity.path;
    return persistenceEntity;
  }
}
