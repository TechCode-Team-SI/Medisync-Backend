import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { MessagesContent } from 'src/notifications/messages.notifications';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
import {
  FilterSymptomsDto,
  SortSymptomsDto,
} from 'src/symptoms/dto/find-all-symptoms.dto';
import { NotificationQueueOperations, QueueName } from 'src/utils/queue-enum';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Symptom } from './domain/symptom';
import { CreateMultipleSymptomsDto } from './dto/create-multiple-symptoms.dto';
import { CreateSymptomDto } from './dto/create-symptom.dto';
import { UpdateSymptomDto } from './dto/update-symptom.dto';
import { SymptomRepository } from './infrastructure/persistence/symptom.repository';
@Injectable()
export class SymptomsService {
  constructor(
    private readonly symptomRepository: SymptomRepository,
    @InjectQueue(QueueName.NOTIFICATION) private notificationQueue: Queue,
  ) {}

  async create(createSymptomDto: CreateSymptomDto) {
    const Symptom = await this.symptomRepository.create(createSymptomDto);
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.symptom.created.title,
          content: MessagesContent.symptom.created.content(Symptom.id),
          type: MessagesContent.symptom.created.type,
        },
        permissions: [PermissionsEnum.MANAGE_SYMPTOMS],
      },
    );
    return Symptom;
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortSymptomsDto[] | null;
    filterOptions?: FilterSymptomsDto | null;
  }) {
    return this.symptomRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
    });
  }

  findOne(id: Symptom['id'], options?: findOptions) {
    return this.symptomRepository.findById(id, options);
  }

  async update(id: Symptom['id'], updateSymptomDto: UpdateSymptomDto) {
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.symptom.updated.title,
          content: MessagesContent.symptom.updated.content(id),
          type: MessagesContent.symptom.updated.type,
        },
        permissions: [PermissionsEnum.MANAGE_SYMPTOMS],
      },
    );
    return this.symptomRepository.update(id, updateSymptomDto);
  }

  async remove(id: Symptom['id']) {
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.symptom.remove.title,
          content: MessagesContent.symptom.remove.content(id),
          type: MessagesContent.symptom.remove.type,
        },
        permissions: [PermissionsEnum.MANAGE_SYMPTOMS],
      },
    );
    return this.symptomRepository.remove(id);
  }

  findMany(ids: Symptom['id'][], options?: findOptions) {
    return this.symptomRepository.findManyByIds(ids, options);
  }

  createMultiple({ symptoms }: CreateMultipleSymptomsDto) {
    return this.symptomRepository.createMultiple(symptoms);
  }

  findAllWithNames(names: string[], options?: findOptions) {
    return this.symptomRepository.findAllWithNames(names, options);
  }
}
