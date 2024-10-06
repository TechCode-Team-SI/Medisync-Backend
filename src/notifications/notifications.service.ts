import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationRepository } from './infrastructure/persistence/notification.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Notification } from './domain/notification';
import { findOptions } from 'src/utils/types/fine-options.type';
import {
  FilterNotificationDto,
  SortNotificationsDto,
} from 'src/notifications/dto/find-all-notifications.dto';
import { NotificationUserRepository } from 'src/notification-users/infrastructure/persistence/notification-user.repository';
import { NotificationUser } from 'src/notification-users/domain/notification-user';
import { User } from 'src/users/domain/user';
import { UserRepository } from 'src/users/infrastructure/persistence/user.repository';
import { exceptionResponses } from './notifications.messages';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
import { CreateNotificationNoTypeDto } from './dto/create-notification-no-type.dto';
import { NotificationTypeEnum } from './notifications.enum';
import { SuccessResponseDto } from 'src/auth/dto/success-response.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly notificationUserRepository: NotificationUserRepository,
    private readonly usersRepository: UserRepository,
  ) {}

  async createForIndividuals(
    createNotificationDto: CreateNotificationDto,
    userIds: string[],
  ) {
    const notification = await this.notificationRepository.create(
      createNotificationDto,
    );
    const notifUserData = userIds.map((userId) => {
      const user = new User();
      user.id = userId;
      const notificationUser = new NotificationUser();
      notificationUser.notification = notification;
      notificationUser.read = false;
      notificationUser.user = user;
      return notificationUser;
    });
    const notifUsers =
      await this.notificationUserRepository.createMany(notifUserData);
    return notifUsers;
  }

  async createForAllSpecialty(
    createNotificationDto: CreateNotificationNoTypeDto,
    specialtyId: string,
  ) {
    const users = await this.usersRepository.findAll({
      filterOptions: {
        specialtyIds: [specialtyId],
      },
    });
    const userIds = users.map((user) => user.id);
    return this.createForIndividuals(
      {
        ...createNotificationDto,
        type: NotificationTypeEnum.WORK,
      },
      userIds,
    );
  }

  async createForAllMobileUsers(
    createNotificationDto: CreateNotificationNoTypeDto,
  ) {
    const users = await this.usersRepository.findAll({
      filterOptions: {
        permissionSlugs: [PermissionsEnum.ACCESS_MOBILE],
      },
    });
    const userIds = users.map((user) => user.id);
    return this.createForIndividuals(
      {
        ...createNotificationDto,
        type: NotificationTypeEnum.PATIENT,
      },
      userIds,
    );
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortNotificationsDto[] | null;
    filterOptions?: FilterNotificationDto;
  }) {
    return this.notificationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
    });
  }

  findOne(id: Notification['id'], options?: findOptions) {
    return this.notificationRepository.findById(id, options);
  }

  remove(id: Notification['id']) {
    return this.notificationRepository.remove(id);
  }

  async readMany(
    userId: string,
    ids: NotificationUser['id'][],
  ): Promise<SuccessResponseDto> {
    const notifUsers = await this.notificationUserRepository.findMany(ids, {
      options: { withUser: true },
    });
    const hasPermission = notifUsers.every(
      (notifUser) => notifUser.user.id === userId,
    );
    if (!hasPermission) {
      throw new UnprocessableEntityException(exceptionResponses.NotPermitted);
    }
    await this.notificationUserRepository.updateMany(ids, { read: true });
    return { success: true };
  }

  async readAll(userId: string): Promise<SuccessResponseDto> {
    await this.notificationUserRepository.updateManyByUserId(userId, {
      read: true,
    });
    return {
      success: true,
    };
  }
}
