import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';
import { Diagnostic } from '../../../../domain/diagnostic';
import { DiagnosticEntity } from '../entities/diagnostic.entity';
import { SpecialtyMapper } from 'src/specialties/infrastructure/persistence/relational/mappers/specialty.mapper';
import { RequestMapper } from 'src/requests/infrastructure/persistence/relational/mappers/request.mapper';

export class DiagnosticMapper {
  static toDomain(raw: DiagnosticEntity): Diagnostic {
    const domainEntity = new Diagnostic();
    domainEntity.id = raw.id;
    domainEntity.description = raw.description;
    if (raw.madeBy) {
      domainEntity.madeBy = UserMapper.toDomain(raw.madeBy);
    }
    if (raw.specialty) {
      domainEntity.specialty = SpecialtyMapper.toDomain(raw.specialty);
    }
    if (raw.request) {
      domainEntity.request = RequestMapper.toDomain(raw.request);
    }
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Diagnostic): DiagnosticEntity {
    const persistenceEntity = new DiagnosticEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.description = domainEntity.description;
    if (domainEntity.madeBy) {
      persistenceEntity.madeBy = UserMapper.toPersistence(domainEntity.madeBy);
    }
    if (domainEntity.specialty) {
      persistenceEntity.specialty = SpecialtyMapper.toPersistence(
        domainEntity.specialty,
      );
    }
    if (domainEntity.request) {
      persistenceEntity.request = RequestMapper.toPersistence(
        domainEntity.request,
      );
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
