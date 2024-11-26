import { Injectable } from '@nestjs/common';
import { CreateSymptomDto } from './dto/create-symptom.dto';
import { UpdateSymptomDto } from './dto/update-symptom.dto';
import { SymptomRepository } from './infrastructure/persistence/symptom.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Symptom } from './domain/symptom';
import { findOptions } from 'src/utils/types/fine-options.type';
import {
  FilterSymptomsDto,
  SortSymptomsDto,
} from 'src/symptoms/dto/find-all-symptoms.dto';
import { CreateMultipleSymptomsDto } from './dto/create-multiple-symptoms.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { MessagesContent } from 'src/notifications/messages.notifications';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
@Injectable()
export class SymptomsService {
  constructor(
    private readonly symptomRepository: SymptomRepository,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createSymptomDto: CreateSymptomDto) {
    const Symptom = await this.symptomRepository.create(createSymptomDto);
    await this.notificationsService.createForUsersByPermission(
      {
        title: MessagesContent.symptom.created.title,
        content: MessagesContent.symptom.created.content(Symptom.id),
        type: MessagesContent.symptom.created.type,
      },
      [PermissionsEnum.MANAGE_SYMPTOMS],
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
    await this.notificationsService.createForUsersByPermission(
      {
        title: MessagesContent.symptom.updated.title,
        content: MessagesContent.symptom.updated.content(id),
        type: MessagesContent.symptom.updated.type,
      },
      [PermissionsEnum.MANAGE_SYMPTOMS],
    );
    return this.symptomRepository.update(id, updateSymptomDto);
  }

  async remove(id: Symptom['id']) {
    await this.notificationsService.createForUsersByPermission(
      {
        title: MessagesContent.symptom.remove.title,
        content: MessagesContent.symptom.remove.content(id),
        type: MessagesContent.symptom.remove.type,
      },
      [PermissionsEnum.MANAGE_SYMPTOMS],
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
