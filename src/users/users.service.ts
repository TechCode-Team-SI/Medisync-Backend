import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { RolesService } from 'src/roles/roles.service';
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
import { EmployeeProfile } from 'src/employee-profiles/domain/employee-profile';
import { EmployeeProfileMapper } from 'src/employee-profiles/infrastructure/persistence/relational/mappers/employee-profile.mapper';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly filesService: FilesService,
    private readonly rolesService: RolesService,
  ) {}

  async create(createProfileDto: CreateUserDto): Promise<User> {
    const clonedPayload = {
      ...createProfileDto,
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

    return this.usersRepository.create(
      {
        ...clonedPayload,
        employeeProfile,
      },
      roles,
    );
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
    options?: findOptions & { employeeProfile: boolean };
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
    options?: findOptions & { withProfile?: boolean; withSpecialty?: boolean },
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
}
