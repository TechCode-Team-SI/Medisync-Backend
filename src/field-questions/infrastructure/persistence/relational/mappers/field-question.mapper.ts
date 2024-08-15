import { isValueInEnum } from 'src/utils/utils';
import { FieldQuestion } from '../../../../domain/field-question';
import { FieldQuestionEntity } from '../entities/field-question.entity';
import { FieldQuestionTypeEnum } from 'src/field-questions/field-questions.enum';

export class FieldQuestionMapper {
  static toDomain(raw: FieldQuestionEntity): FieldQuestion {
    const domainEntity = new FieldQuestion();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.label = raw.label;
    domainEntity.slug = raw.slug;
    domainEntity.description = raw.description;
    domainEntity.type = raw.type;
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
    persistenceEntity.isRequired = domainEntity.isRequired;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
