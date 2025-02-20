import { SpecialtyMapper } from 'src/specialties/infrastructure/persistence/relational/mappers/specialty.mapper';
import { AgendaMapper } from 'src/agendas/infrastructure/persistence/relational/mappers/agenda.mapper';
import { EmployeeProfileEntity } from '../entities/employee-profile.entity';
import { EmployeeProfile } from 'src/employee-profiles/domain/employee-profile';
import { EmployeeProfileDto } from 'src/employee-profiles/dto/employee-profile.dto';
import { Specialty } from 'src/specialties/domain/specialty';
import { RoomMapper } from 'src/rooms/infrastructure/persistence/relational/mappers/room.mapper';

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
    domainEntity.isMedic = raw.isMedic;
    if (raw.specialties) {
      domainEntity.specialties = raw.specialties.map((specialty) =>
        SpecialtyMapper.toDomain(specialty),
      );
    }
    if (raw.room) {
      domainEntity.room = RoomMapper.toDomain(raw.room);
    }
    if (raw.agenda) {
      domainEntity.agenda = AgendaMapper.toDomain(raw.agenda);
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
    persistenceEntity.isMedic = domainEntity.isMedic;
    if (domainEntity.specialties) {
      persistenceEntity.specialties = domainEntity.specialties.map(
        (specialty) => SpecialtyMapper.toPersistence(specialty),
      );
    }
    if (domainEntity.room) {
      persistenceEntity.room = RoomMapper.toPersistence(domainEntity.room);
    }
    if (domainEntity.agenda) {
      persistenceEntity.agenda = AgendaMapper.toPersistence(
        domainEntity.agenda,
      );
    } else if (domainEntity.agenda === null) {
      persistenceEntity.agenda = null;
    }

    return persistenceEntity;
  }

  static fromDtotoDomain(dto: EmployeeProfileDto): EmployeeProfile {
    const domainEntity = new EmployeeProfile();
    domainEntity.MPPS = dto.MPPS;
    domainEntity.CML = dto.CML;
    if (dto.isMedic !== undefined) {
      domainEntity.isMedic = dto.isMedic;
    }
    if (dto.isMedic) {
      domainEntity.isMedic = dto.isMedic;
    }
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
