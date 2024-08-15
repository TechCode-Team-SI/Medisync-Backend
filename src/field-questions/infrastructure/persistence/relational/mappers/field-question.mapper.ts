import { isValueInEnum } from 'src/utils/utils';
import { FieldQuestion } from '../../../../domain/field-question';
import { FieldQuestionEntity } from '../entities/field-question.entity';
import { FieldQuestionTypeEnum } from 'src/field-questions/field-questions.enum';
import { SelectionConfigurationMapper } from './selection-configuration.mapper';
import { SelectionMapper } from './selection.mapper';

export class FieldQuestionMapper {
  static toDomain(raw: FieldQuestionEntity): FieldQuestion {
    const domainEntity = new FieldQuestion();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.label = raw.label;
    domainEntity.slug = raw.slug;
    domainEntity.description = raw.description;
    domainEntity.type = raw.type;
    if (raw.selectionConfig) {
      domainEntity.selectionConfig = SelectionConfigurationMapper.toDomain(
        raw.selectionConfig,
      );
    }
    if (raw.selections) {
      domainEntity.selections = raw.selections.map((selection) =>
        SelectionMapper.toDomain(selection),
      );
    }
    domainEntity.isRequired = raw.isRequired;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: FieldQuestion): FieldQuestionEntity {
    const persistenceEntity = new FieldQuestionEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.label = domainEntity.label;
    persistenceEntity.slug = domainEntity.slug;
    persistenceEntity.description = domainEntity.description;
    if (isValueInEnum(FieldQuestionTypeEnum, domainEntity.type)) {
      persistenceEntity.type = domainEntity.type;
    }
    if (domainEntity.selectionConfig) {
      persistenceEntity.selectionConfig =
        SelectionConfigurationMapper.toPersistence(
          domainEntity.selectionConfig,
        );
    }
    if (domainEntity.selections) {
      persistenceEntity.selections = domainEntity.selections.map((selection) =>
        SelectionMapper.toPersistence(selection),
      );
    }
    persistenceEntity.isRequired = domainEntity.isRequired;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
