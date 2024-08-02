import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './infrastructure/persistence/role.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Role } from './domain/role';
import { exceptionResponses } from './roles.messages';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.findByName(createRoleDto.name);
    if (role)
      throw new UnprocessableEntityException(exceptionResponses.AlreadyExists);
    return this.roleRepository.create(createRoleDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.roleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Role['id']) {
    return this.roleRepository.findById(id);
  }

  findMany(ids: Role['id'][]) {
    return this.roleRepository.findManyByIds(ids);
  }

  update(id: Role['id'], updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
  }

  remove(id: Role['id']) {
    return this.roleRepository.remove(id);
  }
}
