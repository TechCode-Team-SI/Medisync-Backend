import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { RolesService } from 'src/roles/roles.service';
import { FilesService } from '../files/files.service';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { User } from './domain/user';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { exceptionResponses } from './users.messages';

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

    const roles = clonedPayload.roles || [];

    return this.usersRepository.create(clonedPayload, roles);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    return this.usersRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: User['id']): Promise<NullableType<User>> {
    return this.usersRepository.findById(id);
  }

  findByEmail(email: User['email']): Promise<NullableType<User>> {
    return this.usersRepository.findByEmail(email);
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
