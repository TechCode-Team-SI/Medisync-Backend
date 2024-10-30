import { SpecialtyMapper } from 'src/specialties/infrastructure/persistence/relational/mappers/specialty.mapper';
import { AgendaMapper } from 'src/agendas/infrastructure/persistence/relational/mappers/agenda.mapper';
import { EmployeeProfileEntity } from '../entities/employee-profile.entity';
import { EmployeeProfile } from 'src/employee-profiles/domain/employee-profile';
import { EmployeeProfileDto } from 'src/employee-profiles/dto/employee-profile.dto';
import { Specialty } from 'src/specialties/domain/specialty';
import { ScheduleMapper } from 'src/schedules/infrastructure/persistence/relational/mappers/schedule.mapper';

export class EmployeeProfileMapper {
  static toDomain(raw: EmployeeProfileEntity): EmployeeProfile {
    const domainEntity = new EmployeeProfile();
    domainEntity.MPPS = raw.MPPS;
    domainEntity.CML = raw.CML;
    domainEntity.gender = raw.gender;
    domainEntity.id = raw.id;
    domainEntity.address = raw.address;
    domainEntity.birthday = raw.birthday;
    domainEntity.dni = raw.dni;
    domainEntity.status = raw.status;
    if (raw.specialties) {
      domainEntity.specialties = raw.specialties.map((specialty) =>
        SpecialtyMapper.toDomain(specialty),
      );
    }
    if (raw.agenda) {
      domainEntity.agenda = AgendaMapper.toDomain(raw.agenda);
    }
    if (raw.schedule) {
      domainEntity.schedule = ScheduleMapper.toDomain(raw.schedule);
    }

    return domainEntity;
  }

  static toPersistence(domainEntity: EmployeeProfile): EmployeeProfileEntity {
    const persistenceEntity = new EmployeeProfileEntity();
    persistenceEntity.MPPS = domainEntity.MPPS;
    persistenceEntity.CML = domainEntity.CML;
    persistenceEntity.gender = domainEntity.gender;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.address = domainEntity.address;
    persistenceEntity.birthday = domainEntity.birthday;
    persistenceEntity.dni = domainEntity.dni;
    persistenceEntity.status = domainEntity.status;
    if (domainEntity.specialties) {
      persistenceEntity.specialties = domainEntity.specialties.map(
        (specialty) => SpecialtyMapper.toPersistence(specialty),
      );
    }
    if (domainEntity.agenda) {
      persistenceEntity.agenda = AgendaMapper.toPersistence(
        domainEntity.agenda,
      );
    } else if (domainEntity.agenda === null) {
      persistenceEntity.agenda = null;
    }
    if (domainEntity.schedule) {
      persistenceEntity.schedule = ScheduleMapper.toPersistence(
        domainEntity.schedule,
      );
    } else if (domainEntity.schedule === null) {
      persistenceEntity.schedule = null;
    }

    return persistenceEntity;
  }

  static fromDtotoDomain(dto: EmployeeProfileDto): EmployeeProfile {
    const domainEntity = new EmployeeProfile();
    if (dto.address) {
      domainEntity.address = dto.address;
    }
    if (dto.birthday) {
      domainEntity.birthday = dto.birthday;
    }
    if (dto.dni) {
      domainEntity.dni = dto.dni;
    }
    if (dto.specialties) {
      domainEntity.specialties = dto.specialties.map((specialty) => {
        const newSpecialty = new Specialty();
        newSpecialty.id = specialty.id;
        return newSpecialty;
      });
    }
    return domainEntity;
  }
}
