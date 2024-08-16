import { FieldQuestionMapper } from 'src/field-questions/infrastructure/persistence/relational/mappers/field-question.mapper';
import { RequestTemplateField } from '../../../../domain/request-template-field';
import { RequestTemplateFieldEntity } from '../entities/request-template-field.entity';
import { RequestTemplateMapper } from './request-template.mapper';

export class RequestTemplateFieldMapper {
  static toDomain(raw: RequestTemplateFieldEntity): RequestTemplateField {
    const domainEntity = new RequestTemplateField();
    domainEntity.id = raw.id;
    domainEntity.order = raw.order;
    if (raw.requestTemplate) {
      domainEntity.requestTemplate = RequestTemplateMapper.toDomain(
        raw.requestTemplate,
      );
    }
    if (raw.fieldQuestion) {
      domainEntity.fieldQuestion = FieldQuestionMapper.toDomain(
        raw.fieldQuestion,
      );
    }
    return domainEntity;
  }

  static toPersistence(
    domainEntity: RequestTemplateField,
  ): RequestTemplateFieldEntity {
    const persistenceEntity = new RequestTemplateFieldEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.order = domainEntity.order;
    if (domainEntity.requestTemplate) {
      persistenceEntity.requestTemplate = RequestTemplateMapper.toPersistence(
        domainEntity.requestTemplate,
      );
    }
    if (domainEntity.fieldQuestion) {
      persistenceEntity.fieldQuestion = FieldQuestionMapper.toPersistence(
        domainEntity.fieldQuestion,
      );
    }

    return persistenceEntity;
  }
}
