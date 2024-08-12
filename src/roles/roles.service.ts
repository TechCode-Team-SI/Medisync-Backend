import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { slugify } from 'src/utils/utils';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Role } from './domain/role';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './infrastructure/persistence/role.repository';
import { exceptionResponses } from './roles.messages';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto) {
    const slug = slugify(createRoleDto.name);
    const role = await this.roleRepository.findBySlug(slug);
    if (role) {
      throw new UnprocessableEntityException(exceptionResponses.AlreadyExists);
    }

    const data = { ...createRoleDto, slug };
    return this.roleRepository.create(data);
  }

  findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }) {
    return this.roleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
    });
  }

  findOne(id: Role['id'], options?: findOptions) {
    return this.roleRepository.findById(id, options);
  }

  findbySlug(slug: Role['slug'], options?: findOptions) {
    return this.roleRepository.findBySlug(slug, options);
  }

  findMany(ids: Role['id'][], options?: findOptions) {
    return this.roleRepository.findManyByIds(ids, options);
  }

  findManyBySlugs(slugs: Role['slug'][], options?: findOptions) {
    return this.roleRepository.findManyBySlugs(slugs, options);
  }

  update(id: Role['id'], updateRoleDto: UpdateRoleDto) {
    const data: UpdateRoleDto & { slug?: string } = {
      ...updateRoleDto,
    };

    if (updateRoleDto.name) {
      data.slug = slugify(updateRoleDto.name);
    }

    return this.roleRepository.update(id, data);
  }

  async remove(id: Role['id']) {
    return this.roleRepository.remove(id);
  }
}
