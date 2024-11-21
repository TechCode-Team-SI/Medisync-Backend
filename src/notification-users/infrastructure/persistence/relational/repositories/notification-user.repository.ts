import { Injectable, Inject, NotFoundException, Scope } from '@nestjs/common';
import {
  Repository,
  FindOptionsRelations,
  DataSource,
  FindOneOptions,
  In,
} from 'typeorm';
import { NotificationUserEntity } from '../entities/notification-user.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { NotificationUser } from '../../../../domain/notification-user';
import { NotificationUserRepository } from '../../notification-user.repository';
import { NotificationUserMapper } from '../mappers/notification-user.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/notification-users/notification-users.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { REQUEST } from '@nestjs/core';
import { formatOrder } from 'src/utils/utils';
import { SortNotificationUsersDto } from 'src/notification-users/dto/find-all-notification-users.dto';

@Injectable({ scope: Scope.REQUEST })
export class NotificationUserRelationalRepository
  extends BaseRepository
  implements NotificationUserRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get notificationUserRepository(): Repository<NotificationUserEntity> {
    return this.getRepository(NotificationUserEntity);
  }

  private relations: FindOptionsRelations<NotificationUserEntity> = {};

  async create(data: NotificationUser): Promise<NotificationUser> {
    const persistenceModel = NotificationUserMapper.toPersistence(data);
    const newEntity = await this.notificationUserRepository.save(
      this.notificationUserRepository.create(persistenceModel),
    );
    return NotificationUserMapper.toDomain(newEntity);
  }

  async createMany(data: NotificationUser[]): Promise<NotificationUser[]> {
    const persistenceModels = data.map((item) =>
      NotificationUserMapper.toPersistence(item),
    );
    const newEntities = await this.notificationUserRepository.save(
      this.notificationUserRepository.create(persistenceModels),
    );
    return newEntities.map((entity) => NotificationUserMapper.toDomain(entity));
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortNotificationUsersDto[] | null;
  }): Promise<PaginationResponseDto<NotificationUser>> {
    let order: FindOneOptions<NotificationUserEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] =
      await this.notificationUserRepository.findAndCount({
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        relations,
        order,
      });
    const items = entities.map((entity) =>
      NotificationUserMapper.toDomain(entity),
    );

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'notification-users',
      },
    );
  }

  async findAll({
    options,
    sortOptions,
  }: {
    options?: findOptions;
    sortOptions?: SortNotificationUsersDto[] | null;
  }): Promise<NotificationUser[]> {
    let order: FindOneOptions<NotificationUserEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entities = await this.notificationUserRepository.find({
      relations,
      order,
    });
    const items = entities.map((entity) =>
      NotificationUserMapper.toDomain(entity),
    );

    return items;
  }

  async findMany(
    ids: NotificationUser['id'][],
    {
      options,
      sortOptions,
    }: {
      options?: findOptions & { withUser: boolean };
      sortOptions?: SortNotificationUsersDto[] | null;
    },
  ): Promise<NotificationUser[]> {
    let relations = this.relations;
    if (options) relations = {};
    if (options?.withUser) relations = { ...relations, user: true };
    if (options?.minimal) relations = {};

    let order: FindOneOptions<NotificationUserEntity>['order'] = {};
    if (sortOptions) order = formatOrder(sortOptions);

    const entities = await this.notificationUserRepository.find({
      where: { id: In(ids) },
      relations,
      order,
    });
    const items = entities.map((entity) =>
      NotificationUserMapper.toDomain(entity),
    );

    return items;
  }

  async findById(
    id: NotificationUser['id'],
    options?: findOptions,
  ): Promise<NullableType<NotificationUser>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.notificationUserRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? NotificationUserMapper.toDomain(entity) : null;
  }

  async update(
    id: NotificationUser['id'],
    payload: Partial<NotificationUser>,
  ): Promise<NotificationUser> {
    const entity = await this.notificationUserRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.notificationUserRepository.save(
      this.notificationUserRepository.create(
        NotificationUserMapper.toPersistence({
          ...NotificationUserMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return NotificationUserMapper.toDomain(updatedEntity);
  }

  async updateManyByUserId(
    id: string,
    payload: Partial<NotificationUser>,
  ): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, notification, ...data } = payload;
      await this.notificationUserRepository.update(
        {
          user: { id },
        },
        { ...data },
      );
    } catch (error) {
      return false;
    }

    return true;
  }

  async updateMany(
    id: string[],
    payload: Partial<NotificationUser>,
  ): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, notification, ...data } = payload;

      await this.notificationUserRepository.update({ id: In(id) }, { ...data });
    } catch (error) {
      return false;
    }

    return true;
  }

  async remove(id: NotificationUser['id']): Promise<void> {
    await this.notificationUserRepository.delete(id);
  }
}
