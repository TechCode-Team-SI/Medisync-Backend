import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import {
  FilterIllnessesDto,
  SortIllnessesDto,
} from 'src/illnesses/dto/find-all-illnesses.dto';
import { MessagesContent } from 'src/notifications/messages.notifications';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
import { NotificationQueueOperations, QueueName } from 'src/utils/queue-enum';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Illness } from './domain/illness';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { CreateMultipleIllnessesDto } from './dto/create-multiple-illnesses.dto';
import { UpdateIllnessDto } from './dto/update-illness.dto';
import { IllnessRepository } from './infrastructure/persistence/illness.repository';
@Injectable()
export class IllnessesService {
  constructor(
    private readonly illnessRepository: IllnessRepository,
    @InjectQueue(QueueName.NOTIFICATION) private notificationQueue: Queue,
  ) {}

  async create(createIllnessDto: CreateIllnessDto) {
    const result = await this.illnessRepository.create(createIllnessDto);
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.illness.created.title,
          content: MessagesContent.illness.created.content(result.id),
          type: MessagesContent.illness.created.type,
        },
        permissions: [PermissionsEnum.MANAGE_ILLNESSES],
      },
    );
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
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.illness.updated.title,
          content: MessagesContent.illness.updated.content(id),
          type: MessagesContent.illness.updated.type,
        },
        permissions: [PermissionsEnum.MANAGE_ILLNESSES],
      },
    );
    return this.illnessRepository.update(id, updateIllnessDto);
  }

  async remove(id: Illness['id']) {
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.illness.remove.title,
          content: MessagesContent.illness.remove.content(id),
          type: MessagesContent.illness.remove.type,
        },
        permissions: [PermissionsEnum.MANAGE_ILLNESSES],
      },
    );
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
