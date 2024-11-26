import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { NotificationQueueOperations, QueueName } from 'src/utils/queue-enum';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
import { CreateNotificationNoTypeDto } from './dto/create-notification-no-type.dto';

@Processor(QueueName.NOTIFICATION)
@Injectable()
export class NotificationConsumer extends WorkerHost {
  constructor(private readonly notificationService: NotificationsService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case NotificationQueueOperations.CREATE_FOR_INDIVIDUALS: {
        const data: {
          payload: CreateNotificationDto;
          userIds: string[];
        } = job.data;
        return this.notificationService.createForIndividuals(data);
      }
      case NotificationQueueOperations.CREATE_FOR_MOBILE: {
        const data: CreateNotificationNoTypeDto = job.data;
        return this.notificationService.createForAllMobileUsers(data);
      }
      case NotificationQueueOperations.CREATE_FOR_SPECIALTY: {
        const data: {
          payload: CreateNotificationNoTypeDto;
          specialtyId: string;
        } = job.data;
        return this.notificationService.createForAllSpecialty(data);
      }
      case NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS: {
        const data: {
          payload: CreateNotificationDto;
          permissions: PermissionsEnum[];
        } = job.data;
        return this.notificationService.createForUsersByPermission(data);
      }
    }
  }
}
