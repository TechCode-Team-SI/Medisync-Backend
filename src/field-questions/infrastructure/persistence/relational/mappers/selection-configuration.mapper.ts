import { SelectionConfiguration } from 'src/field-questions/domain/selection-configuration';
import { SelectionConfigurationEntity } from '../entities/selection-configuration.entity';
import { FieldQuestionMapper } from './field-question.mapper';

export class SelectionConfigurationMapper {
  static toDomain(raw: SelectionConfigurationEntity): SelectionConfiguration {
    const domainEntity = new SelectionConfiguration();
    domainEntity.id = raw.id;
    domainEntity.isMultiple = raw.isMultiple;
    if (raw.fieldQuestion) {
      domainEntity.fieldQuestion = FieldQuestionMapper.toDomain(
        raw.fieldQuestion,
      );
    }

    return domainEntity;
  }

  static toPersistence(
    domainEntity: SelectionConfiguration,
  ): SelectionConfigurationEntity {
    const persistenceEntity = new SelectionConfigurationEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.isMultiple = domainEntity.isMultiple;
    if (domainEntity.fieldQuestion) {
      persistenceEntity.fieldQuestion = FieldQuestionMapper.toPersistence(
        domainEntity.fieldQuestion,
      );
    }

    return persistenceEntity;
  }
}
