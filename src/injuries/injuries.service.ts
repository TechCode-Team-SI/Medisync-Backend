import { Injectable } from '@nestjs/common';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';
import { InjuryRepository } from './infrastructure/persistence/injury.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Injury } from './domain/injury';
import { findOptions } from 'src/utils/types/fine-options.type';
import {
  FilterInjuriesDto,
  SortInjuriesDto,
} from 'src/injuries/dto/find-all-injuries.dto';
import { CreateMultipleInjuriesDto } from './dto/create-multiple-injuries.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { MessagesContent } from 'src/notifications/messages.notifications';
import { PermissionsEnum } from 'src/permissions/permissions.enum';

@Injectable()
export class InjuriesService {
  constructor(
    private readonly injuryRepository: InjuryRepository,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createInjuryDto: CreateInjuryDto) {
    const result = await this.injuryRepository.create(createInjuryDto);
    await this.notificationsService.createForUsersByPermission({
      payload: {
        title: MessagesContent.injurie.created.title,
        content: MessagesContent.injurie.created.content(result.id),
        type: MessagesContent.injurie.created.type,
      },
      permissions: [PermissionsEnum.MANAGE_INJURIES],
    });
    return result;
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortInjuriesDto[] | null;
    filterOptions?: FilterInjuriesDto | null;
  }) {
    return this.injuryRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
    });
  }

  findOne(id: Injury['id'], options?: findOptions) {
    return this.injuryRepository.findById(id, options);
  }

  async update(id: Injury['id'], updateInjuryDto: UpdateInjuryDto) {
    await this.notificationsService.createForUsersByPermission({
      payload: {
        title: MessagesContent.injurie.updated.title,
        content: MessagesContent.injurie.updated.content(id),
        type: MessagesContent.injurie.updated.type,
      },
      permissions: [PermissionsEnum.MANAGE_INJURIES],
    });
    return this.injuryRepository.update(id, updateInjuryDto);
  }

  async remove(id: Injury['id']) {
    await this.notificationsService.createForUsersByPermission({
      payload: {
        title: MessagesContent.injurie.remove.title,
        content: MessagesContent.injurie.remove.content(id),
        type: MessagesContent.injurie.remove.type,
      },
      permissions: [PermissionsEnum.MANAGE_INJURIES],
    });
    return this.injuryRepository.remove(id);
  }

  findMany(ids: Injury['id'][], options?: findOptions) {
    return this.injuryRepository.findManyByIds(ids, options);
  }

  createMultiple({ injuries }: CreateMultipleInjuriesDto) {
    return this.injuryRepository.createMultiple(injuries);
  }

  findAllWithNames(names: string[], options?: findOptions) {
    return this.injuryRepository.findAllWithNames(names, options);
  }
}
