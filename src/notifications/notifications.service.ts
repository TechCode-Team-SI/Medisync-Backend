import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { SuccessResponseDto } from 'src/auth/dto/success-response.dto';
import { NotificationUser } from 'src/notification-users/domain/notification-user';
import { NotificationUserRepository } from 'src/notification-users/infrastructure/persistence/notification-user.repository';
import {
  FilterNotificationDto,
  SortNotificationsDto,
} from 'src/notifications/dto/find-all-notifications.dto';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
import { SocketEnum } from 'src/socket/socket-enum';
import { SocketService } from 'src/socket/socket.service';
import { User } from 'src/users/domain/user';
import { UserRepository } from 'src/users/infrastructure/persistence/user.repository';
import { MailQueueOperations, QueueName } from 'src/utils/queue-enum';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Notification } from './domain/notification';
import { CreateNotificationNoTypeDto } from './dto/create-notification-no-type.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationRepository } from './infrastructure/persistence/notification.repository';
import { NotificationTypeEnum } from './notifications.enum';
import { exceptionResponses } from './notifications.messages';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly notificationUserRepository: NotificationUserRepository,
    private readonly usersRepository: UserRepository,
    private readonly socketService: SocketService,
    @InjectQueue(QueueName.MAIL) private mailQueue: Queue,
  ) {}

  async createForIndividuals(
    createNotificationDto: CreateNotificationDto,
    users: User[],
  ) {
    const notification = await this.notificationRepository.create(
      createNotificationDto,
    );
    const notifUserData = users.map((user) => {
      const notificationUser = new NotificationUser();
      notificationUser.notification = notification;
      notificationUser.read = false;
      notificationUser.user = user;
      return notificationUser;
    });

    const [notifUsers] = await Promise.all([
      this.notificationUserRepository.createMany(notifUserData),
      ...users.map((user) =>
        this.mailQueue.add(MailQueueOperations.NOTIFICATION, {
          to: user.email,
          data: {
            content: createNotificationDto.content,
            title: createNotificationDto.title,
          },
        }),
      ),
    ]);

    this.socketService.broadcastMessageToRooms(
      users.map((user) => user.id),
      SocketEnum.NOTIFICATION,
      notifUsers,
    );

    return notifUsers;
  }

  async createForUsersByPermission(
    createNotificationDto: CreateNotificationDto,
    permissions: PermissionsEnum[],
  ) {
    const users = await this.usersRepository.findAllByPermissions(permissions);

    return this.createForIndividuals(createNotificationDto, users);
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

    return this.createForIndividuals(
      {
        ...createNotificationDto,
        type: NotificationTypeEnum.WORK,
      },
      users,
    );
  }

  async createForAllMobileUsers(
    createNotificationDto: CreateNotificationNoTypeDto,
  ) {
    const users = await this.usersRepository.findAll({
      filterOptions: {
        permissionSlugs: [PermissionsEnum.USE_MOBILE],
      },
    });

    return this.createForIndividuals(
      {
        ...createNotificationDto,
        type: NotificationTypeEnum.PATIENT,
      },
      users,
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
