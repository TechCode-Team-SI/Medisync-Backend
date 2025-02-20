import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';
import { Diagnostic } from '../../../../domain/diagnostic';
import { DiagnosticEntity } from '../entities/diagnostic.entity';
import { SpecialtyMapper } from 'src/specialties/infrastructure/persistence/relational/mappers/specialty.mapper';
import { RequestMapper } from 'src/requests/infrastructure/persistence/relational/mappers/request.mapper';
import { InjuryMapper } from 'src/injuries/infrastructure/persistence/relational/mappers/injury.mapper';
import { SymptomMapper } from 'src/symptoms/infrastructure/persistence/relational/mappers/symptom.mapper';
import { TreatmentMapper } from 'src/treatments/infrastructure/persistence/relational/mappers/treatment.mapper';
import { PathologyMapper } from 'src/pathologies/infrastructure/persistence/relational/mappers/pathology.mapper';

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
    if (raw.injuries) {
      domainEntity.injuries = raw.injuries.map((injury) =>
        InjuryMapper.toDomain(injury),
      );
    }
    if (raw.symptoms) {
      domainEntity.symptoms = raw.symptoms.map((symptom) =>
        SymptomMapper.toDomain(symptom),
      );
    }
    if (raw.treatments) {
      domainEntity.treatments = raw.treatments.map((treatment) =>
        TreatmentMapper.toDomain(treatment),
      );
    }
    if (raw.pathologies) {
      domainEntity.pathologies = raw.pathologies.map((pathology) =>
        PathologyMapper.toDomain(pathology),
      );
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
    if (domainEntity.injuries) {
      persistenceEntity.injuries = domainEntity.injuries.map((injury) =>
        InjuryMapper.toPersistence(injury),
      );
    }
    if (domainEntity.symptoms) {
      persistenceEntity.symptoms = domainEntity.symptoms.map((symptom) =>
        SymptomMapper.toPersistence(symptom),
      );
    }
    if (domainEntity.treatments) {
      persistenceEntity.treatments = domainEntity.treatments.map((treatment) =>
        TreatmentMapper.toPersistence(treatment),
      );
    }
    if (domainEntity.pathologies) {
      persistenceEntity.pathologies = domainEntity.pathologies.map(
        (pathology) => PathologyMapper.toPersistence(pathology),
      );
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
