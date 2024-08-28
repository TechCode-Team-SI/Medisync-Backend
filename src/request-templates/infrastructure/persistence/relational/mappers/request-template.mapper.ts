import { RequestTemplate } from '../../../../domain/request-template';
import { RequestTemplateEntity } from '../entities/request-template.entity';
import { RequestTemplateFieldMapper } from './request-template-field.mapper';

export class RequestTemplateMapper {
  static toDomain(raw: RequestTemplateEntity): RequestTemplate {
    const domainEntity = new RequestTemplate();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.slug = raw.slug;
    if (raw.fields) {
      domainEntity.fields = raw.fields.map((field) =>
        RequestTemplateFieldMapper.toDomain(field),
      );
      domainEntity.fields.sort((a, b) => a.order - b.order);
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: RequestTemplate): RequestTemplateEntity {
    const persistenceEntity = new RequestTemplateEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    if (domainEntity.fields) {
      persistenceEntity.fields = domainEntity.fields.map((field) =>
        RequestTemplateFieldMapper.toPersistence(field),
      );
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.slug = domainEntity.slug;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
