import { FieldQuestionMapper } from 'src/field-questions/infrastructure/persistence/relational/mappers/field-question.mapper';
import { SelectionMapper } from 'src/field-questions/infrastructure/persistence/relational/mappers/selection.mapper';
import { RequestValue } from 'src/requests/domain/request-value';
import { RequestValueEntity } from '../entities/request-value.entity';
import { RequestMapper } from './request.mapper';

export class RequestValueMapper {
  static toDomain(raw: RequestValueEntity): RequestValue {
    const domainEntity = new RequestValue();
    domainEntity.id = raw.id;
    if (raw.request) {
      domainEntity.request = RequestMapper.toDomain(raw.request);
    }
    if (raw.fieldQuestion) {
      domainEntity.fieldQuestion = FieldQuestionMapper.toDomain(
        raw.fieldQuestion,
      );
    }
    if (raw.selections) {
      domainEntity.selections = raw.selections.map((selection) =>
        SelectionMapper.toDomain(selection),
      );
    }
    domainEntity.value = raw.value;

    return domainEntity;
  }

  static toPersistence(domainEntity: RequestValue): RequestValueEntity {
    const persistenceEntity = new RequestValueEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    if (domainEntity.request) {
      persistenceEntity.request = RequestMapper.toPersistence(
        domainEntity.request,
      );
    }
    if (domainEntity.fieldQuestion) {
      persistenceEntity.fieldQuestion = FieldQuestionMapper.toPersistence(
        domainEntity.fieldQuestion,
      );
    }
    if (domainEntity.selections) {
      persistenceEntity.selections = domainEntity.selections?.map((selection) =>
        SelectionMapper.toPersistence(selection),
      );
    }
    persistenceEntity.value = domainEntity.value;

    return persistenceEntity;
  }
}
