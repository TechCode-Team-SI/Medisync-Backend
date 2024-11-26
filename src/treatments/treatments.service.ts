import { Injectable } from '@nestjs/common';
import { CreatetreatmentDto } from './dto/create-treatment.dto';
import { UpdatetreatmentDto } from './dto/update-treatment.dto';
import { TreatmentRepository } from './infrastructure/persistence/treatment.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Treatment } from './domain/treatment';
import { findOptions } from 'src/utils/types/fine-options.type';
import {
  FilterTreatmentsDto,
  SortTreatmentsDto,
} from 'src/treatments/dto/find-all-treatments.dto';
import { CreateMultipleTreatmentsDto } from './dto/create-multiple-treatments.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { MessagesContent } from 'src/notifications/messages.notifications';
import { PermissionsEnum } from 'src/permissions/permissions.enum';

@Injectable()
export class TreatmentsService {
  constructor(
    private readonly TreatmentRepository: TreatmentRepository,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createtreatmentDto: CreatetreatmentDto) {
    const treatment = await this.TreatmentRepository.create(createtreatmentDto);
    await this.notificationsService.createForUsersByPermission({
      payload: {
        title: MessagesContent.treatment.created.title,
        content: MessagesContent.treatment.created.content(treatment.id),
        type: MessagesContent.treatment.created.type,
      },
      permissions: [PermissionsEnum.MANAGE_TREATMENTS],
    });
    return treatment;
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortTreatmentsDto[] | null;
    filterOptions?: FilterTreatmentsDto | null;
  }) {
    return this.TreatmentRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
    });
  }

  findOne(id: Treatment['id'], options?: findOptions) {
    return this.TreatmentRepository.findById(id, options);
  }

  async update(id: Treatment['id'], updatetreatmentDto: UpdatetreatmentDto) {
    await this.notificationsService.createForUsersByPermission({
      payload: {
        title: MessagesContent.treatment.updated.title,
        content: MessagesContent.treatment.updated.content(id),
        type: MessagesContent.treatment.updated.type,
      },
      permissions: [PermissionsEnum.MANAGE_TREATMENTS],
    });
    return this.TreatmentRepository.update(id, updatetreatmentDto);
  }

  async remove(id: Treatment['id']) {
    await this.notificationsService.createForUsersByPermission({
      payload: {
        title: MessagesContent.treatment.remove.title,
        content: MessagesContent.treatment.remove.content(id),
        type: MessagesContent.treatment.remove.type,
      },
      permissions: [PermissionsEnum.MANAGE_TREATMENTS],
    });
    return this.TreatmentRepository.remove(id);
  }

  findMany(ids: Treatment['id'][], options?: findOptions) {
    return this.TreatmentRepository.findManyByIds(ids, options);
  }

  createMultiple({ treatments }: CreateMultipleTreatmentsDto) {
    return this.TreatmentRepository.createMultiple(treatments);
  }

  findAllWithNames(names: string[], options?: findOptions) {
    return this.TreatmentRepository.findAllWithNames(names, options);
  }
}
