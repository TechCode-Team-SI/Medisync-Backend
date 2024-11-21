import { Injectable, Inject, NotFoundException, Scope } from '@nestjs/common';
import {
  Repository,
  FindOptionsRelations,
  DataSource,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';
import { NotificationEntity } from '../entities/notification.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Notification } from '../../../../domain/notification';
import { NotificationRepository } from '../../notification.repository';
import { NotificationMapper } from '../mappers/notification.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/notifications/notifications.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { REQUEST } from '@nestjs/core';
import { formatOrder } from 'src/utils/utils';
import {
  FilterNotificationDto,
  SortNotificationsDto,
} from 'src/notifications/dto/find-all-notifications.dto';

@Injectable({ scope: Scope.REQUEST })
export class NotificationRelationalRepository
  extends BaseRepository
  implements NotificationRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get notificationRepository(): Repository<NotificationEntity> {
    return this.getRepository(NotificationEntity);
  }

  private relations: FindOptionsRelations<NotificationEntity> = {
    notificationUsers: true,
  };

  async create(data: Notification): Promise<Notification> {
    const persistenceModel = NotificationMapper.toPersistence(data);
    const newEntity = await this.notificationRepository.save(
      this.notificationRepository.create(persistenceModel),
    );
    return NotificationMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortNotificationsDto[] | null;
    filterOptions?: FilterNotificationDto;
  }): Promise<PaginationResponseDto<Notification>> {
    let where: FindOptionsWhere<NotificationEntity> = {};
    if (filterOptions?.userId) {
      where = {
        ...where,
        notificationUsers: {
          user: {
            id: filterOptions.userId,
          },
        },
      };
    }
    if (filterOptions?.read) {
      where = {
        ...where,
        notificationUsers: {
          read: filterOptions.read,
        },
      };
    }
    if (filterOptions?.type) {
      where = {
        ...where,
        type: filterOptions.type,
      };
    }
    let order: FindOneOptions<NotificationEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.notificationRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
      where,
      order,
    });
    const items = entities.map((entity) => NotificationMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'notifications',
      },
    );
  }

  async findById(
    id: Notification['id'],
    options?: findOptions,
  ): Promise<NullableType<Notification>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.notificationRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? NotificationMapper.toDomain(entity) : null;
  }

  async update(
    id: Notification['id'],
    payload: Partial<Notification>,
  ): Promise<Notification> {
    const entity = await this.notificationRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.notificationRepository.save(
      this.notificationRepository.create(
        NotificationMapper.toPersistence({
          ...NotificationMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return NotificationMapper.toDomain(updatedEntity);
  }

  async remove(id: Notification['id']): Promise<void> {
    await this.notificationRepository.delete(id);
  }
}
