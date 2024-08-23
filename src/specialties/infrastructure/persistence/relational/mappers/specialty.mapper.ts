import { FileMapper } from 'src/files/infrastructure/persistence/relational/mappers/file.mapper';
import { Specialty } from '../../../../domain/specialty';
import { SpecialtyEntity } from '../entities/specialty.entity';
import { EmployeeProfileMapper } from 'src/users/infrastructure/persistence/relational/mappers/employee-profile.mapper';
import { RequestTemplateMapper } from 'src/request-templates/infrastructure/persistence/relational/mappers/request-template.mapper';

export class SpecialtyMapper {
  static toDomain(raw: SpecialtyEntity): Specialty {
    const domainEntity = new Specialty();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    if (raw.image) {
      domainEntity.image = FileMapper.toDomain(raw.image);
    }
    if (raw.employees) {
      domainEntity.employees = raw.employees.map((employee) =>
        EmployeeProfileMapper.toDomain(employee),
      );
    }
    if (raw.requestTemplate) {
      domainEntity.requestTemplate = RequestTemplateMapper.toDomain(
        raw.requestTemplate,
      );
    }
    domainEntity.isGroup = raw.isGroup;
    domainEntity.isPublic = raw.isPublic;
    domainEntity.isDisabled = raw.isDisabled;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Specialty): SpecialtyEntity {
    const persistenceEntity = new SpecialtyEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    if (domainEntity.image) {
      persistenceEntity.image = FileMapper.toPersistence(domainEntity.image);
    }
    if (domainEntity.requestTemplate) {
      persistenceEntity.requestTemplate = RequestTemplateMapper.toPersistence(
        domainEntity.requestTemplate,
      );
    }
    persistenceEntity.isGroup = domainEntity.isGroup;
    persistenceEntity.isPublic = domainEntity.isPublic;
    persistenceEntity.isDisabled = domainEntity.isDisabled;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
