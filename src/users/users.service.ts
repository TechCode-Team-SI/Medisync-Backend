import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { EmployeeProfile } from 'src/employee-profiles/domain/employee-profile';
import { EmployeeProfileRepository } from 'src/employee-profiles/infrastructure/persistence/employee-profile.repository';
import { EmployeeProfileMapper } from 'src/employee-profiles/infrastructure/persistence/relational/mappers/employee-profile.mapper';
import { RolesService } from 'src/roles/roles.service';
import { SpecialtyRepository } from 'src/specialties/infrastructure/persistence/specialty.repository';
import { UserPatient } from 'src/user-patients/domain/user-patient';
import { CreateUserPatientDto } from 'src/user-patients/dto/create-user-patient.dto';
import {
  FilterUserPatientsDto,
  SortUserPatientsDto,
} from 'src/user-patients/dto/find-all-user-patients.dto';
import { UpdateUserPatientDto } from 'src/user-patients/dto/update-user-patient.dto';
import { UserPatientRepository } from 'src/user-patients/infrastructure/persistence/user-patient.repository';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { findOptions } from 'src/utils/types/fine-options.type';
import { FilesService } from '../files/files.service';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { User } from './domain/user';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { exceptionResponses } from './users.messages';
import { AgendaRepository } from 'src/agendas/infrastructure/persistence/agenda.repository';
import { ScheduleRepository } from 'src/schedules/infrastructure/persistence/schedule.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly filesService: FilesService,
    private readonly rolesService: RolesService,
    private readonly employeeProfilesRepository: EmployeeProfileRepository,
    private readonly userPatientsRepository: UserPatientRepository,
    private readonly specialtiesRepository: SpecialtyRepository,
    private readonly agendasRepository: AgendaRepository,
    private readonly schedulesRepository: ScheduleRepository,
  ) {}

  async create(createProfileDto: CreateUserDto): Promise<User> {
    const { userPatient, ...data } = createProfileDto;
    const clonedPayload = {
      ...data,
    };

    if (clonedPayload.password) {
      const salt = await bcrypt.genSalt();
      clonedPayload.password = await bcrypt.hash(clonedPayload.password, salt);
    }

    const userObject = await this.usersRepository.findByEmail(
      clonedPayload.email,
    );
    if (userObject) {
      throw new UnprocessableEntityException(exceptionResponses.EmailTaken);
    }

    if (clonedPayload.photo?.id) {
      const fileObject = await this.filesService.findById(
        clonedPayload.photo.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException(
          exceptionResponses.AvatarNotExist,
        );
      }
      clonedPayload.photo = fileObject;
    }

    if (clonedPayload.roles && clonedPayload.roles.length > 0) {
      const ids = clonedPayload.roles.map((role) => role.id);
      const roleObjects = await this.rolesService.findMany(ids);

      if (!roleObjects || roleObjects.length !== clonedPayload.roles.length) {
        throw new UnprocessableEntityException(exceptionResponses.RoleNotExist);
      }
    }

    let employeeProfile: EmployeeProfile | undefined = undefined;
    if (clonedPayload.employeeProfile) {
      employeeProfile = EmployeeProfileMapper.fromDtotoDomain(
        clonedPayload.employeeProfile,
      );
    }

    const roles = clonedPayload.roles || [];

    const user = await this.usersRepository.create(
      {
        ...clonedPayload,
        employeeProfile,
      },
      roles,
    );

    if (userPatient) {
      const profilePatient = await this.createUserPatient(user.id, userPatient);
      if (!profilePatient) {
        throw new UnprocessableEntityException(
          exceptionResponses.UserPatientNotCreated,
        );
      }
    }

    return user;
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    options,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
    options?: findOptions & {
      employeeProfile?: boolean;
      specialties?: boolean;
    };
  }): Promise<PaginationResponseDto<User>> {
    return this.usersRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
      options,
    });
  }

  findById(
    id: User['id'],
    options?: findOptions & {
      withProfile?: boolean;
      withSpecialty?: boolean;
      withUserPatients?: boolean;
    },
  ): Promise<NullableType<User>> {
    return this.usersRepository.findById(id, options);
  }

  findByEmail(email: User['email']): Promise<NullableType<User>> {
    return this.usersRepository.findByEmail(email);
  }

  count(): Promise<number> {
    return this.usersRepository.count();
  }

  async update(
    id: User['id'],
    payload: DeepPartial<User>,
  ): Promise<User | null> {
    const clonedPayload = { ...payload };

    if (clonedPayload.password) {
      const salt = await bcrypt.genSalt();
      clonedPayload.password = await bcrypt.hash(clonedPayload.password, salt);
    }

    if (clonedPayload.email) {
      const userObject = await this.usersRepository.findByEmail(
        clonedPayload.email,
      );

      if (userObject && userObject.id !== id) {
        throw new UnprocessableEntityException(exceptionResponses.EmailTaken);
      }
    }

    if (clonedPayload.employeeProfile) {
      const user = await this.usersRepository.findById(id);

      if (user?.employeeProfile && !clonedPayload.employeeProfile.id) {
        throw new UnprocessableEntityException(
          exceptionResponses.ProfileAlreadyExists,
        );
      }
    }

    if (clonedPayload.photo?.id) {
      const fileObject = await this.filesService.findById(
        clonedPayload.photo.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException(
          exceptionResponses.AvatarNotExist,
        );
      }
      clonedPayload.photo = fileObject;
    }

    if (clonedPayload.roles && clonedPayload.roles.length > 0) {
      const ids = clonedPayload.roles.reduce<string[]>((roleIds, role) => {
        if (role?.id) {
          roleIds.push(role.id);
        }
        return roleIds;
      }, []);
      const roleObjects = await this.rolesService.findMany(ids);

      if (!roleObjects || roleObjects.length !== clonedPayload.roles.length) {
        throw new UnprocessableEntityException(exceptionResponses.RoleNotExist);
      }
    }

    return this.usersRepository.update(id, clonedPayload);
  }

  async remove(id: User['id']): Promise<void> {
    await this.usersRepository.remove(id);
  }

  async updateEmployeeStatus(id: User['id'], status: boolean) {
    const user = await this.usersRepository.findById(id, { withProfile: true });
    if (!user) {
      throw new UnprocessableEntityException(exceptionResponses.UserNotFound);
    }
    if (!user.employeeProfile) {
      throw new UnprocessableEntityException(
        exceptionResponses.ProfileNotExist,
      );
    }
    await this.employeeProfilesRepository.update(user.employeeProfile.id, {
      status,
    });

    return true;
  }

  async getUserPatients(
    id: User['id'],
    options: {
      paginationOptions: IPaginationOptions;
      options?: findOptions;
      sortOptions?: SortUserPatientsDto[] | null;
      filterOptions?: FilterUserPatientsDto | null;
    },
  ) {
    const filterOptions = {
      ...options.filterOptions,
      userId: id,
    };
    return this.userPatientsRepository.findAllWithPagination({
      ...options,
      filterOptions,
    });
  }

  async getAllUserPatients(options: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortUserPatientsDto[] | null;
    filterOptions?: FilterUserPatientsDto | null;
  }) {
    const filterOptions = {
      ...options.filterOptions,
    };
    return this.userPatientsRepository.findAllWithPagination({
      ...options,
      filterOptions,
    });
  }

  async findUserPatient(id: string) {
    return this.userPatientsRepository.findById(id);
  }

  async createUserPatient(
    id: User['id'],
    createPatientDto: CreateUserPatientDto,
  ) {
    const user = new User();
    user.id = id;
    const clonedPayload = {
      ...createPatientDto,
      user,
    };

    const foundPatient = await this.userPatientsRepository.findByDNI(
      createPatientDto.dni,
    );
    if (foundPatient) {
      throw new UnprocessableEntityException(
        exceptionResponses.PatientAlreadyExists,
      );
    }

    return this.userPatientsRepository.create(clonedPayload);
  }

  async updateUserPatient(
    userId: string,
    id: UserPatient['id'],
    updatePatientDto: UpdateUserPatientDto,
  ) {
    const user = await this.usersRepository.findById(userId, {
      withUserPatients: true,
    });
    if (!user) {
      throw new UnprocessableEntityException(exceptionResponses.UserNotFound);
    }
    const foundPatient = user.userPatients?.find(
      (patient) => patient.id === id,
    );
    if (!foundPatient) {
      throw new UnprocessableEntityException(
        exceptionResponses.PatientNotFound,
      );
    }
    return this.userPatientsRepository.update(id, updatePatientDto);
  }

  async updateUserSpecialties(userId: string, specialtyIds: string[]) {
    const user = await this.usersRepository.findById(userId, {
      withSpecialty: true,
    });
    if (!user) {
      throw new UnprocessableEntityException(exceptionResponses.UserNotFound);
    }
    if (!user.employeeProfile) {
      throw new UnprocessableEntityException(exceptionResponses.NotEmployee);
    }
    const specialties = await Promise.all(
      specialtyIds.map((id) => this.specialtiesRepository.findById(id)),
    );
    if (!specialties || specialties.length !== specialtyIds.length) {
      throw new UnprocessableEntityException(
        exceptionResponses.SpecialtyNotExist,
      );
    }
    const specialtiesFiltered = specialties.filter(
      (specialty) => specialty !== null,
    );

    return this.employeeProfilesRepository.update(user.employeeProfile.id, {
      specialties: specialtiesFiltered,
    });
  }

  async updateUserRoles(userId: string, roleIds: string[]) {
    const user = await this.usersRepository.findById(userId, {
      withProfile: true,
    });
    if (!user) {
      throw new UnprocessableEntityException(exceptionResponses.UserNotFound);
    }
    if (!user.employeeProfile) {
      throw new UnprocessableEntityException(exceptionResponses.NotEmployee);
    }
    const roles = await Promise.all(
      roleIds.map((id) => this.rolesService.findOne(id)),
    );
    if (!roles || roles.length !== roleIds.length) {
      throw new UnprocessableEntityException(exceptionResponses.RoleNotExist);
    }
    const rolesFiltered = roles.filter((role) => role !== null);

    return this.usersRepository.update(user.id, {
      roles: rolesFiltered,
    });
  }

  async updateUserAgenda(userId: string, agendaId?: string | null) {
    const user = await this.usersRepository.findById(userId, {
      withProfile: true,
    });
    if (!user) {
      throw new UnprocessableEntityException(exceptionResponses.UserNotFound);
    }
    if (!user.employeeProfile) {
      throw new UnprocessableEntityException(exceptionResponses.NotEmployee);
    }
    if (agendaId) {
      const agenda = await this.agendasRepository.findById(agendaId);
      if (!agenda) {
        throw new UnprocessableEntityException(
          exceptionResponses.AgendaNotExist,
        );
      }
      return this.employeeProfilesRepository.update(user.employeeProfile.id, {
        agenda,
      });
    } else {
      return this.employeeProfilesRepository.update(user.employeeProfile.id, {
        agenda: null,
      });
    }
  }

  async updateUserSchedule(userId: string, scheduleId?: string | null) {
    const user = await this.usersRepository.findById(userId, {
      withProfile: true,
    });
    if (!user) {
      throw new UnprocessableEntityException(exceptionResponses.UserNotFound);
    }
    if (!user.employeeProfile) {
      throw new UnprocessableEntityException(exceptionResponses.NotEmployee);
    }
    if (scheduleId) {
      const schedule = await this.schedulesRepository.findById(scheduleId);
      if (!schedule) {
        throw new UnprocessableEntityException(
          exceptionResponses.ScheduleNotExist,
        );
      }
      return this.employeeProfilesRepository.update(user.employeeProfile.id, {
        schedule,
      });
    } else {
      return this.employeeProfilesRepository.update(user.employeeProfile.id, {
        schedule: null,
      });
    }
  }
}
