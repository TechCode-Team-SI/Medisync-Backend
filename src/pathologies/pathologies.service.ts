import { Injectable } from '@nestjs/common';
import { CreatePathologyDto } from './dto/create-pathology.dto';
import { UpdatePathologyDto } from './dto/update-pathology.dto';
import { PathologyRepository } from './infrastructure/persistence/pathology.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Pathology } from './domain/pathology';
import { findOptions } from 'src/utils/types/fine-options.type';
import { SortPathologiesDto } from 'src/pathologies/dto/find-all-pathologies.dto';
import { CreateMultiplePathologyDto } from './dto/create-multiple-pathology.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { MessagesContent } from 'src/notifications/messages.notifications';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
@Injectable()
export class PathologiesService {
  constructor(
    private readonly pathologyRepository: PathologyRepository,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createPathologyDto: CreatePathologyDto) {
    const patho = await this.pathologyRepository.create(createPathologyDto);
    await this.notificationsService.createForUsersByPermission(
      {
        title: MessagesContent.pathologie.created.title,
        content: MessagesContent.pathologie.created.content(patho.id),
        type: MessagesContent.pathologie.created.type,
      },
      [PermissionsEnum.MANAGE_PATHOLOGIES],
    );
    return patho;
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortPathologiesDto[] | null;
  }) {
    return this.pathologyRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
    });
  }

  findOne(id: Pathology['id'], options?: findOptions) {
    return this.pathologyRepository.findById(id, options);
  }
 findMany(ids: Pathology['id'][], options?: findOptions) {
    return this.pathologyRepository.findManyByIds(ids, options);
  }
  async update(id: Pathology['id'], updatePathologyDto: UpdatePathologyDto) {
    await this.notificationsService.createForUsersByPermission(
      {
        title: MessagesContent.pathologie.updated.title,
        content: MessagesContent.pathologie.updated.content(id),
        type: MessagesContent.pathologie.updated.type,
      },
      [PermissionsEnum.MANAGE_PATHOLOGIES],
    );
    return this.pathologyRepository.update(id, updatePathologyDto);
  }

  async remove(id: Pathology['id']) {
    await this.notificationsService.createForUsersByPermission(
      {
        title: MessagesContent.pathologie.remove.title,
        content: MessagesContent.pathologie.remove.content(id),
        type: MessagesContent.pathologie.remove.type,
      },
      [PermissionsEnum.MANAGE_PATHOLOGIES],
    );
    return this.pathologyRepository.remove(id);
  }

  createMultiple({ pathologies }: CreateMultiplePathologyDto) {
    return this.pathologyRepository.createMultiple(pathologies);
  }

  findAllWithNames(names: string[], options?: findOptions) {
    return this.pathologyRepository.findAllWithNames(names, options);
  }
}
