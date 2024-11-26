import { Injectable } from '@nestjs/common';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { UpdateIllnessDto } from './dto/update-illness.dto';
import { IllnessRepository } from './infrastructure/persistence/illness.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Illness } from './domain/illness';
import { findOptions } from 'src/utils/types/fine-options.type';
import {
  FilterIllnessesDto,
  SortIllnessesDto,
} from 'src/illnesses/dto/find-all-illnesses.dto';
import { CreateMultipleIllnessesDto } from './dto/create-multiple-illnesses.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { MessagesContent } from 'src/notifications/messages.notifications';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
@Injectable()
export class IllnessesService {
  constructor(
    private readonly illnessRepository: IllnessRepository,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createIllnessDto: CreateIllnessDto) {
    const result = await this.illnessRepository.create(createIllnessDto);
    await this.notificationsService.createForUsersByPermission({
      payload: {
        title: MessagesContent.illness.created.title,
        content: MessagesContent.illness.created.content(result.id),
        type: MessagesContent.illness.created.type,
      },
      permissions: [PermissionsEnum.MANAGE_ILLNESSES],
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
    sortOptions?: SortIllnessesDto[] | null;
    filterOptions?: FilterIllnessesDto | null;
  }) {
    return this.illnessRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
    });
  }

  findOne(id: Illness['id'], options?: findOptions) {
    return this.illnessRepository.findById(id, options);
  }

  async update(id: Illness['id'], updateIllnessDto: UpdateIllnessDto) {
    await this.notificationsService.createForUsersByPermission({
      payload: {
        title: MessagesContent.illness.updated.title,
        content: MessagesContent.illness.updated.content(id),
        type: MessagesContent.illness.updated.type,
      },
      permissions: [PermissionsEnum.MANAGE_ILLNESSES],
    });
    return this.illnessRepository.update(id, updateIllnessDto);
  }

  async remove(id: Illness['id']) {
    await this.notificationsService.createForUsersByPermission({
      payload: {
        title: MessagesContent.illness.remove.title,
        content: MessagesContent.illness.remove.content(id),
        type: MessagesContent.illness.remove.type,
      },
      permissions: [PermissionsEnum.MANAGE_ILLNESSES],
    });
    return this.illnessRepository.remove(id);
  }

  findMany(ids: Illness['id'][], options?: findOptions) {
    return this.illnessRepository.findManyByIds(ids, options);
  }

  createMultiple({ illnesses }: CreateMultipleIllnessesDto) {
    return this.illnessRepository.createMultiple(illnesses);
  }

  findAllWithNames(names: string[], options?: findOptions) {
    return this.illnessRepository.findAllWithNames(names, options);
  }
}
