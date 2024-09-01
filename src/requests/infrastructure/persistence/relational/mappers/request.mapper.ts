import { RequestTemplateMapper } from 'src/request-templates/infrastructure/persistence/relational/mappers/request-template.mapper';
import {
  RequestFormatted,
  SelectionField,
  TextField,
} from 'src/requests/domain/request-formatted';
import { RequestStatusEnum } from 'src/requests/requests.enum';
import { SpecialtyMapper } from 'src/specialties/infrastructure/persistence/relational/mappers/specialty.mapper';
import { UserMapper } from 'src/users/infrastructure/persistence/relational/mappers/user.mapper';
import { isValueInEnum } from 'src/utils/utils';
import { Request } from '../../../../domain/request';
import { RequestEntity } from '../entities/request.entity';
import { RequestValueMapper } from './request-value.mapper';
import { SelectionConfiguration } from 'src/field-questions/domain/selection-configuration';
import { RatingMapper } from 'src/ratings/infrastructure/persistence/relational/mappers/rating.mapper';

export class RequestMapper {
  static toDomain(raw: RequestEntity): Request {
    const domainEntity = new Request();
    domainEntity.id = raw.id;
    domainEntity.patientFullName = raw.patientFullName;
    domainEntity.patientDNI = raw.patientDNI;
    domainEntity.patientAddress = raw.patientAddress;
    domainEntity.appointmentHour = raw.appointmentHour;
    domainEntity.status = raw.status;
    if (raw.requestedMedic) {
      domainEntity.requestedMedic = UserMapper.toDomain(raw.requestedMedic);
    }
    if (raw.requestedSpecialty) {
      domainEntity.requestedSpecialty = SpecialtyMapper.toDomain(
        raw.requestedSpecialty,
      );
    }
    if (raw.requestTemplate) {
      domainEntity.requestTemplate = RequestTemplateMapper.toDomain(
        raw.requestTemplate,
      );
    }
    if (raw.requestValues) {
      domainEntity.requestValues = raw.requestValues.map((value) =>
        RequestValueMapper.toDomain(value),
      );
    }
    if (raw.rating) {
      domainEntity.rating = RatingMapper.toDomain(raw.rating);
    }
    if (raw.madeBy) {
      domainEntity.madeBy = UserMapper.toDomain(raw.madeBy);
    }
    if (raw.referredBy) {
      domainEntity.requestedMedic = UserMapper.toDomain(raw.requestedMedic);
    }
    domainEntity.referredContent = raw.referredContent;
    domainEntity.createdAt = raw.createdAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Request): RequestEntity {
    const persistenceEntity = new RequestEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.patientFullName = domainEntity.patientFullName;
    persistenceEntity.patientDNI = domainEntity.patientDNI;
    persistenceEntity.patientAddress = domainEntity.patientAddress;
    persistenceEntity.appointmentHour = domainEntity.appointmentHour;
    if (isValueInEnum(RequestStatusEnum, domainEntity.status)) {
      persistenceEntity.status = domainEntity.status;
    }
    if (domainEntity.requestedMedic) {
      persistenceEntity.requestedMedic = UserMapper.toPersistence(
        domainEntity.requestedMedic,
      );
    }
    if (domainEntity.madeBy) {
      persistenceEntity.madeBy = UserMapper.toPersistence(domainEntity.madeBy);
    }
    if (domainEntity.requestedSpecialty) {
      persistenceEntity.requestedSpecialty = SpecialtyMapper.toPersistence(
        domainEntity.requestedSpecialty,
      );
    }
    if (domainEntity.requestTemplate) {
      persistenceEntity.requestTemplate = RequestTemplateMapper.toPersistence(
        domainEntity.requestTemplate,
      );
    }
    if (domainEntity.requestValues) {
      persistenceEntity.requestValues = domainEntity.requestValues.map(
        (value) => RequestValueMapper.toPersistence(value),
      );
    }
    if (domainEntity.referredBy) {
      persistenceEntity.referredBy = UserMapper.toPersistence(
        domainEntity.referredBy,
      );
    }
    persistenceEntity.referredContent = domainEntity.referredContent;
    persistenceEntity.createdAt = domainEntity.createdAt;

    return persistenceEntity;
  }

  static toFormatted(raw: RequestEntity): RequestFormatted {
    const formattedEntity = new RequestFormatted();
    formattedEntity.id = raw.id;
    formattedEntity.patient = {
      fullName: raw.patientFullName,
      dni: raw.patientDNI,
      address: raw.patientAddress,
    };
    formattedEntity.requestedMedic = {
      fullName: raw.requestedMedic.fullName,
    };
    if (raw.referredBy) {
      formattedEntity.referredBy = {
        fullName: raw.referredBy?.fullName,
      };
    }
    formattedEntity.requestedSpecialty = {
      name: raw.requestedSpecialty.name,
    };
    formattedEntity.referredContent = raw.referredContent;
    formattedEntity.appointmentHour = raw.appointmentHour;
    formattedEntity.status = raw.status;
    const fields = raw.requestTemplate.fields.reduce<
      RequestFormatted['fields']
    >((acc, field) => {
      const requestValue = raw.requestValues.find(
        (request) => request.fieldQuestion.id === field.fieldQuestion.id,
      );

      if (!requestValue) return acc;

      if (field.fieldQuestion.selectionConfig) {
        const selections =
          field.fieldQuestion.selections?.map((selection) => {
            const isSelected = requestValue.selections?.findIndex(
              (val) => val.id === selection.id,
            );
            return {
              id: selection.id,
              value: selection.value,
              isSelected: isSelected !== -1,
            };
          }) || [];

        const selectionConfig = new SelectionConfiguration();
        selectionConfig.isMultiple =
          field.fieldQuestion.selectionConfig.isMultiple;

        const response: SelectionField = {
          order: field.order,
          label: field.fieldQuestion.label,
          description: field.fieldQuestion.description,
          type: field.fieldQuestion.type,
          isRequired: field.fieldQuestion.isRequired,
          selectionConfig,
          selections,
        };
        return [...acc, response];
      } else {
        if (!requestValue.value) return acc;

        const response: TextField = {
          order: field.order,
          value: requestValue.value,
          label: field.fieldQuestion.label,
          description: field.fieldQuestion.description,
          type: field.fieldQuestion.type,
          isRequired: field.fieldQuestion.isRequired,
        };
        return [...acc, response];
      }
    }, []);
    fields.sort((a, b) => a.order - b.order);

    formattedEntity.fields = fields;
    formattedEntity.createdAt = raw.createdAt;

    return formattedEntity;
  }
}
