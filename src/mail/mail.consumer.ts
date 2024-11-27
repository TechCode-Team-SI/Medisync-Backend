import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { MailQueueOperations, QueueName } from 'src/utils/queue-enum';
import { MailData } from './interfaces/mail-data.interface';
import { MailService } from './mail.service';

@Processor(QueueName.MAIL)
@Injectable()
export class MailConsumer extends WorkerHost {
  constructor(private readonly mailService: MailService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<void> {
    switch (job.name) {
      case MailQueueOperations.NOTIFICATION: {
        const data: MailData = job.data;
        return this.mailService.notificationEmail(data);
      }
      case MailQueueOperations.CONFIRM_EMAIL: {
        const data: MailData = job.data;
        return this.mailService.confirmEmail(data);
      }
      case MailQueueOperations.FORGOT_PASSWORD: {
        const data: MailData = job.data;
        return this.mailService.forgotPassword(data);
      }
    }
  }
}
