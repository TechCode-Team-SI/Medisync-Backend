import { FieldQuestionMapper } from 'src/field-questions/infrastructure/persistence/relational/mappers/field-question.mapper';
import { StatisticsMetadata } from '../../../../domain/statistics-metadata';
import { StatisticsMetadataEntity } from '../entities/statistics-metadata.entity';

export class StatisticsMetadataMapper {
  static toDomain(raw: StatisticsMetadataEntity): StatisticsMetadata {
    const domainEntity = new StatisticsMetadata();
    domainEntity.id = raw.id;
    domainEntity.label = raw.label;
    if (raw.fieldQuestion) {
      domainEntity.fieldQuestion = FieldQuestionMapper.toDomain(
        raw.fieldQuestion,
      );
    }
    domainEntity.type = raw.type;
    domainEntity.filteredByType = raw.filteredByType;
    domainEntity.filter = raw.filter;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: StatisticsMetadata,
  ): StatisticsMetadataEntity {
    const persistenceEntity = new StatisticsMetadataEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.label = domainEntity.label;
    if (domainEntity.fieldQuestion) {
      persistenceEntity.fieldQuestion = FieldQuestionMapper.toPersistence(
        domainEntity.fieldQuestion,
      );
    }
    persistenceEntity.type = domainEntity.type;
    persistenceEntity.filteredByType = domainEntity.filteredByType;
    if (domainEntity.filter) {
      persistenceEntity.filter = domainEntity.filter;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
