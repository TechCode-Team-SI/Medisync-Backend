import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateNotificationUserDto } from './dto/create-notification-user.dto';
import { UpdateNotificationUserDto } from './dto/update-notification-user.dto';
import { NotificationUserRepository } from './infrastructure/persistence/notification-user.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { NotificationUser } from './domain/notification-user';
import { findOptions } from 'src/utils/types/fine-options.type';
import { SortNotificationUsersDto } from 'src/notification-users/dto/find-all-notification-users.dto';
import { exceptionResponses } from './notification-users.messages';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class NotificationUsersService {
  constructor(
    private readonly notificationUserRepository: NotificationUserRepository,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(createNotificationUserDto: CreateNotificationUserDto) {
    const notifId = createNotificationUserDto.notification.id;
    const notification = await this.notificationsService.findOne(notifId);
    if (!notification) {
      throw new UnprocessableEntityException(
        exceptionResponses.notificationNotExists,
      );
    }
    const clonedPlayload = {
      ...createNotificationUserDto,
      notification,
    };
    return this.notificationUserRepository.create(clonedPlayload);
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortNotificationUsersDto[] | null;
  }) {
    return this.notificationUserRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
    });
  }

  findOne(id: NotificationUser['id'], options?: findOptions) {
    return this.notificationUserRepository.findById(id, options);
  }

  update(
    id: NotificationUser['id'],
    updateNotificationUserDto: UpdateNotificationUserDto,
  ) {
    return this.notificationUserRepository.update(
      id,
      updateNotificationUserDto,
    );
  }

  remove(id: NotificationUser['id']) {
    return this.notificationUserRepository.remove(id);
  }
}
