import { Selection } from 'src/field-questions/domain/selection';
import { SelectionEntity } from '../entities/selection.entity';
import { FieldQuestionMapper } from './field-question.mapper';

export class SelectionMapper {
  static toDomain(raw: SelectionEntity): Selection {
    const domainEntity = new Selection();
    domainEntity.id = raw.id;
    domainEntity.value = raw.value;
    if (raw.fieldQuestion) {
      domainEntity.fieldQuestion = FieldQuestionMapper.toDomain(
        raw.fieldQuestion,
      );
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: Selection): SelectionEntity {
    const persistenceEntity = new SelectionEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.value = domainEntity.value;
    if (domainEntity.fieldQuestion) {
      persistenceEntity.fieldQuestion = FieldQuestionMapper.toPersistence(
        domainEntity.fieldQuestion,
      );
    }

    return persistenceEntity;
  }
}
