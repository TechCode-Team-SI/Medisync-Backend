import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { slugify } from 'src/utils/utils';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Role } from './domain/role';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './infrastructure/persistence/role.repository';
import { exceptionResponses } from './roles.messages';
import { findOptions } from 'src/utils/types/fine-options.type';
import { SortRoleDto } from './dto/find-all-roles.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { MessagesContent } from 'src/notifications/messages.notifications';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
@Injectable()
export class RolesService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const slug = slugify(createRoleDto.name);
    const role = await this.roleRepository.findBySlug(slug);
    if (role) {
      throw new UnprocessableEntityException(exceptionResponses.AlreadyExists);
    }

    const data = { ...createRoleDto, slug };
    const result = await this.roleRepository.create(data);
    await this.notificationsService.createForUsersByPermission({
      payload: {
        title: MessagesContent.role.created.title,
        content: MessagesContent.role.created.content(result.id),
        type: MessagesContent.role.created.type,
      },
      permissions: [PermissionsEnum.MANAGE_ROLES],
    });
    return result;
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortRoleDto[] | null;
  }) {
    return this.roleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
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

  async update(id: Role['id'], updateRoleDto: UpdateRoleDto) {
    const data: UpdateRoleDto & { slug?: string } = {
      ...updateRoleDto,
    };

    if (updateRoleDto.name) {
      data.slug = slugify(updateRoleDto.name);
    }
    await this.notificationsService.createForUsersByPermission({
      payload: {
        title: MessagesContent.role.updated.title,
        content: MessagesContent.role.updated.content(id),
        type: MessagesContent.role.updated.type,
      },
      permissions: [PermissionsEnum.MANAGE_ROLES],
    });
    return this.roleRepository.update(id, data);
  }

  async remove(id: Role['id']) {
    await this.notificationsService.createForUsersByPermission({
      payload: {
        title: MessagesContent.role.remove.title,
        content: MessagesContent.role.remove.content(id),
        type: MessagesContent.role.remove.type,
      },
      permissions: [PermissionsEnum.MANAGE_ROLES],
    });
    return this.roleRepository.remove(id);
  }
}
